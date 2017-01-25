exports.loadStyles = function (paths, minify) {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader?modules' + (minify ? ',minimize' : ''),
            'sass-loader'
          ],
          exclude: /node_modules/
        }
      ]
    }
  };
};
