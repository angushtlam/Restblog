exports.loadStyles = function (minify) {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader' + (minify ? '?minimize' : ''),
            'sass-loader'
          ],
          exclude: /node_modules/
        }
      ]
    }
  };
};
