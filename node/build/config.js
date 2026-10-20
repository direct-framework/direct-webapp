const { resolve } = require('node:path')

const path = {
  scss: resolve(__dirname, '../src/scss'),
  src_js: resolve(__dirname, '../src/js'),
  js: resolve(__dirname, '../../main/static/assets/js'),
  css: resolve(__dirname, '../../main/static/assets/css'),
}

module.exports = path
