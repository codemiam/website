// Node import
const path = require('path');
const webpack = require('webpack');

// Plugins de traitement pour dist/
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');

// Config pour le devServer
const host = '0.0.0.0'; // Docker interface
const port = 3000;

const devMode = process.env.NODE_ENV !== 'production';

// Config de Webpack
module.exports = {
  // Passe le build par dèfaut en déeveloppement
  mode: 'development',
  // Ne pas utiliser de mock pour process
  node: {
    process: false
  },
  // Expose le dossier src/ pour les imports
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
  },
  // Points d'entrée pour le travail de Webpack
  entry: {
    app: [
      // Styles
      './src/styles/index.sass',
      // JS
      './src/index.js',
    ],
  },
  // Sortie
  output: {
    // Nom du bundle
    filename: 'app.js',
    // Nom du bundle vendors si l'option d'optimisation / splitChunks est activée
    chunkFilename: 'vendors.js',
    // Cible des bundles
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  // Optimisation pour le build
  optimization: {
    // Code spliting
    splitChunks: {
      chunks: 'all',
    },
    // Minification
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // passer à true pour JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  // Modules
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // babel avec une option de cache
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      // CSS / SASS / SCSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // style-loader ou fichier
          devMode ? 'style-loader' :
            MiniCssExtractPlugin.loader,
          // Chargement du CSS
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
              sourceMap: true,
            },
          },
          // SASS
          'sass-loader',
        ],
      },
      // Inages
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    overlay: true, // overlay navigateur si erreurs de build
    stats: 'minimal', // infos en console limitées
    progress: true, // progression du build en console
    inline: true, // rechargement du navigateur en cas de changement
    open: false, // docker, pas d'ouverture automatique
    historyApiFallback: true,
    host: host,
    port: port,
  },
  plugins: [
    // Déclaration des env vars du host dans le code client
    new webpack.DefinePlugin({
      'process': {
        env: JSON.stringify(process.env)
      }
    }),
    // Permet de prendre le index.html de src comme base pour le fichier de dist/
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    // Permet d'exporter les styles CSS dans un fichier css de dist/
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],
};
