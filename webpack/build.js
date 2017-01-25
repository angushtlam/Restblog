const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
// const PurifyCSSPlugin = require('purifycss-webpack-plugin');

exports.clean = function (path, options) {
  return {
    plugins: [
      new CleanWebpackPlugin([ path ], options)
    ]
  };
};

exports.defineFreeVar = function (key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};

exports.extractBundles = function (bundles, options) {
  const entry = {};
  const names = [];

  // Set up entries and names.
  bundles.forEach(({ name, entries }) => {
    if (entries) {
      entry[name] = entries;
    }

    names.push(name);
  });

  return {
    // Define an entry point needed for splitting.
    entry,
    plugins: [
      // Extract bundles.
      new webpack.optimize.CommonsChunkPlugin(
        Object.assign({}, options, { names })
      )
    ]
  };
};

// Convert ES2015 and React to plain ol' JS
exports.transpileBabel = function () {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          },
          exclude: /node_modules/
        }
      ]
    }
  };
};

exports.uglifyJavascript = function () {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        },
        mangle: {
          except: ['webpackJsonp', '$'],
          screw_ie8 : true,
          keep_fnames: true
        }
      })
    ]
  };
};

// exports.purifyCSS = function (paths) {
//   return {
//     plugins: [
//       new PurifyCSSPlugin({
//         basePath: '/',
//         // `paths` is used to point PurifyCSS to files not
//         // visible to webpack. This expects glob patterns so
//         // we adapt here.
//         paths: paths.map(path => `${path}/*`),
//         resolveExtensions: ['.html']
//       })
//     ]
//   };
// };
