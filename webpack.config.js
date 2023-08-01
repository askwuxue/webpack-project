const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname + '/build')
  },
  devServer: {
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              ["@babel/preset-react", {
                "runtime": "automatic"
              }]
            ]
          }
        },
      },
      {
        test: /\.tsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            'presets': [["@babel/preset-react", {
              "runtime": "automatic"
            }],
            '@babel/preset-typescript']
          }
        },
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
        }
      },
      // style-loader 的作用是将样式注入到style标签中
      {
        test: /\.css$/,
        use: [ 
          (process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader), 
          'css-loader', 
          'postcss-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [
          (process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader), 
          'css-loader',
          'postcss-loader',
          'less-loader'
        ],
      }
    ]
  },
  plugins: [ 
    new ESLintPlugin(), 
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }), 
    new MiniCssExtractPlugin()],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  }
}