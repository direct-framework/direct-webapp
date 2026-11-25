// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { execFileSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const nodeRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const projectRoot = resolve(nodeRoot, '..')

const expectedBuildFiles = [
  'css/theme.css',
  'css/theme.css.map',
  'css/theme.min.css',
  'css/theme.min.css.map',
  'css/vendor.bundle.css',
  'js/main.js',
  'js/main.js.map',
  'js/main.min.js',
  'js/main.min.js.map',
  'js/vendor.bundle.js',
  'js/vendor.bundle.js.map',
]

function createBuildFixture() {
  const fixture = mkdtempSync(join(tmpdir(), 'direct asset build-'))

  cpSync(nodeRoot, join(fixture, 'node'), {
    recursive: true,
    filter: (source) =>
      !['node_modules', 'storybook-static'].includes(
        relative(nodeRoot, source).split(sep)[0]
      ),
  })
  cpSync(join(projectRoot, '.editorconfig'), join(fixture, '.editorconfig'))
  symlinkSync(
    join(nodeRoot, 'node_modules'),
    join(fixture, 'node/node_modules'),
    'junction'
  )

  const assets = join(fixture, 'main/static/assets')
  mkdirSync(join(assets, 'css'), { recursive: true })
  mkdirSync(join(assets, 'js'), { recursive: true })

  return { fixture, assets }
}

function runAssetBuild(fixture) {
  execFileSync('npm', ['--prefix', join(fixture, 'node'), 'run', 'build'], {
    cwd: fixture,
    stdio: 'pipe',
    timeout: 120000,
  })
}

function expectSourceMapSourcesToExist(assets, file) {
  const map = JSON.parse(readFileSync(join(assets, file), 'utf8'))
  expect(map.version).toBe(3)
  expect(map.sources.length).toBeGreaterThan(0)

  for (const source of map.sources) {
    const sourcePath = source.startsWith('file:')
      ? fileURLToPath(source)
      : resolve(dirname(join(assets, file)), source)
    expect(existsSync(sourcePath), source).toBe(true)
  }
}

function expectBuildOutputs(assets) {
  const files = readdirSync(assets, { recursive: true }).filter((file) =>
    /\.(css|js|map)$/.test(file)
  )
  expect(files.sort()).toEqual(expectedBuildFiles)

  for (const file of files) {
    expect(readFileSync(join(assets, file)).length).toBeGreaterThan(0)
    if (file.endsWith('.map')) {
      expectSourceMapSourcesToExist(assets, file)
    }
  }
}

describe('Django asset build', () => {
  it('builds the complete asset set from the Node package without root npm tooling', () => {
    // Keep the build isolated from the repository's generated assets.
    const { fixture, assets } = createBuildFixture()

    try {
      runAssetBuild(fixture)
      expectBuildOutputs(assets)
    } finally {
      rmSync(fixture, { recursive: true, force: true })
    }
  }, 150000)
})
