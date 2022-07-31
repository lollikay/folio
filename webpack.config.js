const path = require('path');
const PugPlugin = require('pug-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require("fs");

const entryPoints = {};

const pages =
  fs
    .readdirSync(path.resolve(__dirname, 'src/templates/pages/'))
    .filter(fileName => fileName.endsWith('.pug'));

pages.forEach((page) => {
  entryPoints[page.split(".")[0]] = "./src/templates/pages/" + page
});

module.exports = (env, options) => ({
  entry: entryPoints,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
        options: {
          method: 'render',
        }
      },
      {
        test: /\.(pcss|css)$/i,
        include: path.resolve(__dirname, 'src/styles'),
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              }
            },
          },
        ]
      },
      {
        test: /\.(png|jpg|jpeg)/,
        type: 'asset/resource',
        generator: {
          // output filename for images
          filename: '/images/[name][ext]',
        },
      },
      {
        test: /\.ico/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
    ],
  },
  plugins: [
    options.mode === "development"
      ? false
      : new CleanWebpackPlugin(),
    new PugPlugin({
      pretty: true,
      modules: [
        PugPlugin.extractCss({
          filename: 'styles/[name].css'
        })
      ]
    })
  ].filter(n => n),
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
    filename: '[name].js',
  },
  devServer: {
    watchFiles: ['src/**'],
  },
});