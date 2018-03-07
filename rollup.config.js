var rollup = require('rollup')

export default {
  input: 'tmp/index.js',
  output: {
    format: 'cjs',
    file: 'lib/smart-animator.js'
  },
  sourcemap: true,
  context: 'this',
  name: 'smart-animator'
};
