const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const assets = require('./webpack/assets');
const build = require('./webpack/build');

const paths = {
  app: path.join(__dirname, 'client', 'app'),
  build: path.join(__dirname, 'public'),
  root: __dirname
};

const config = merge([
  {
    entry: {
      app: paths.app
    },
    output: {
      path: paths.build,
      filename: 'static/[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin({ title: 'Test' })
    ]
  },
  build.clean(paths.build, { root: paths.root })
]);

module.exports = function (env) {
  switch (env) {
    case 'production':
      return merge([
        config
      ]);

    default:
      return merge([
        config,
        { plugins: [ new webpack.NamedModulesPlugin() ] },
        assets.loadStyles(paths.app, false)
      ]);
  }
};
