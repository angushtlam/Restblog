const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const assets = require('./webpack/assets');
const build = require('./webpack/build');

const paths = {
  admin: path.join(__dirname, 'client', 'admin'),
  app: path.join(__dirname, 'client', 'app'),
  build: path.join(__dirname, 'public'),
  root: __dirname
};

const config = merge([
  {
    entry: {
      admin: paths.admin
      // app: paths.app
    },
    output: {
      path: paths.build,
      filename: 'static/[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        chunks: ['admin'],
        filename: 'admin.html',
        template: 'ejs/admin.ejs',
        title: 'Restblog Admin'
      }),
      new HtmlWebpackPlugin({
        chunks: ['app'],
        filename: 'index.html',
        template: 'ejs/index.ejs',
        title: 'Restblog' })
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
        assets.loadStyles(false),
        build.transpileBabel()
      ]);
  }
};
