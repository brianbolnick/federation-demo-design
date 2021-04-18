const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
});

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3001
  },
  output: {
    publicPath: 'http://localhost:3001/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'federation_demo_design',
      library: { type: 'var', name: 'federation_demo_design' },
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button'
      },
      shared: ['react', 'react-dom']
    }),
    htmlPlugin
  ]
};
