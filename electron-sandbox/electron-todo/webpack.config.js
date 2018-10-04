const path = require('path');

module.exports = {
  target: 'node',
  entry: './ts/index.tsx',
  // 差分ビルドが出来るようになる
  cache: true,
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader'
    }, {
      test: /\.tsx?$/,
      enforce: 'pre',
      loader: 'tslint-loader',
      options: {
        configFile: './tslint.json',
        typeCheck: true,
      },
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    }, ],
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
    ]
  },
};