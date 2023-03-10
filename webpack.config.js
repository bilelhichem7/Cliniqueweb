const { Agent } = require('http');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
   index:'./src/index.js',
   Agent:'./src/Agent.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  watch: true
};
