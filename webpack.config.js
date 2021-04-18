const HtmlWebPackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
});

module.exports = {
  mode: 'development',
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
      name: 'federation_demo_navbar',
      library: { type: 'var', name: 'federation_demo_navbar' },
      filename: 'remoteEntry.js',
      exposes: {
        './Navbar': './src/Navbar'
      },
      shared: ['react', 'react-dom']
    }),
    htmlPlugin
  ]
};
