const path = require('path');

const SRC_DIR = path.join(__dirname, '/client');
const DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: `${SRC_DIR}/app.jsx`,
  output: {
    filename: 'bundle-proxy.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
    ],
  },
};
