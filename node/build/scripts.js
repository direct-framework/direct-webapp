const path = require('./config')
const rollup = require('rollup')
const nodeResolve = require('@rollup/plugin-node-resolve')
const { babel } = require('@rollup/plugin-babel')
const terser = require('@rollup/plugin-terser')
const { ESLint } = require('eslint')
const configureLogger = require('./logger')
const replace = require('@rollup/plugin-replace')
const commonjs = require('@rollup/plugin-commonjs')

const log = configureLogger('Scripts')

const output = process.argv[2] || 'expanded' // Default to expanded if not provided

const lintJS = async () => {
  log.info('Linting JavaScript...')
  const eslint = new ESLint()
  const results = await eslint.lintFiles(`${path.src_js}/**/*.js`)
  const errorResults = ESLint.getErrorResults(results)

  if (errorResults.length > 0) {
    const formatter = await eslint.loadFormatter('stylish')
    const resultText = formatter.format(errorResults)
    log.error('', resultText)
    throw new Error('Linting errors found')
  } else {
    log.success('Lint JavaScript')
  }
}

const files_to_compile_meta = [
  {
    id: 'theme',
    banner: `
/**
 * Around | Multipurpose Bootstrap HTML Template
 * Copyright 2023 Createx Studio
 * Theme scripts
 *
 * @author Createx Studio
 * @version 3.2.0
 */
`,
  },
  {
    id: 'dataviz',
    banner: `
/**
 * Data visualization scripts
 */
`,
  },
]

const bundleJS = async (output) => {
  log.info('Bundling JavaScript...')

  files_to_compile_meta.forEach(async ({ id, banner }) => {
    try {
      const isMinified = output === 'minified'
      const outputFilename = isMinified ? `${id}.min.js` : `${id}.js`

      const inputOptions = {
        input: `./${path.src_js}/${id}.js`,
        plugins: [
          nodeResolve(),
          // replace({
          //   'process.env.NODE_ENV': JSON.stringify('production'),
          // }),
          // commonjs(),
          babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
          }),
          isMinified && terser({ output: { comments: /^!|@author|@version/i } }),
        ].filter(Boolean),
        onwarn: (warning, warn) => {
          // Ignore the 'this' at the top level warning
          if (warning.code === 'THIS_IS_UNDEFINED') {
            return
          }
          // Show all other warnings
          warn(warning)
        },
      }

      const outputOptions = {
        file: `${path.js}/${outputFilename}`,
        format: 'iife',
        sourcemap: true,
        banner: banner,
        name: id,
      }

      const bundle = await rollup.rollup(inputOptions)
      await bundle.write(outputOptions)

      log.success(`Bundled JavaScript for ${id} (${output})`)
    } catch (error) {
      log.error('', error.message)
    }
  })
}

const buildScripts = async () => {
  try {
    await lintJS()
    if (output === 'expanded' || output === 'minified') {
      await bundleJS(output)
    } else {
      log.error('Invalid output key. Use either "minified" or "expanded"')
    }
  } catch (error) {
    log.error('', error.message)
  }
}

buildScripts()
