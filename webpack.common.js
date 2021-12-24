/* eslint-env node */
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

const srcPath  = path.join(__dirname, 'src');
const destPath = path.join(__dirname, 'dest');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                // fiber: require('fibers'),
                fiber: false
              },
              sourceMap: true,
            },
          }
        ],
      }
    ]
  },
  entry: {
    main: path.join(srcPath, 'main.ts'),
  },
  output: {
    filename: '[name].bundle.js',
    path: destPath,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.join(srcPath, 'index.html'), to: destPath },
      ],
    }),
  ],
  stats: {
    builtAt: true,
    errorsCount: true,
    warningsCount: true,
    timings: true,
  }
}