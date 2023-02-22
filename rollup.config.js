const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const multiEntry = require('rollup-plugin-multi-entry');

module.exports = {
  input: './Assets/**/*.js ./Assets/**/**/*.js',
  output: {
    file: './rpg.js',
    format: 'cjs'
  },
  plugins: [
    multiEntry(),
    resolve(),
    commonjs(),
  ]
};