const path = require('path')
const paths = require('../paths')
var webpack = require('webpack')
const TerserJsPlugin = require('terser-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const babelLoader = (server) => ({
  test: /\.(js|jsx|mjs)$/,
  exclude: /node_modules/,
  loader: require.resolve('babel-loader'),
  options: {
    presets: [
      server
        ? [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              node: 'current'
            },
            corejs: 3,
            useBuiltIns: 'usage'
          }
        ]
        : [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              browsers: ['last 2 versions', 'ie >= 9']
            },
            corejs: 3,
            useBuiltIns: 'usage'
          }
        ]
    ]
  }
})
const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: 'url-loader',
  options: {
    limit: 2048,
    fallback: 'file-loader',
    name: 'assets/[name].[hash:8].[ext]'
  }
}

const fileLoaderClient = {
  test: /\.(png|jpe?g)$/,
  loader: 'file-loader',
  options: {
    name: 'assets/[name].[hash:8].[ext]',
    emitFile: true,
  }
}

const devConfig = {
  mode: 'development',
  name: 'client',
  target: 'web',
  devtool: 'nosources-source-map',
  entry: {
    bundle: [`${paths.src}/client/index.js`]
  },
  output: {
    path: path.join(paths.dist, '/client'),
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: paths.publicPath,
    devtoolModuleFilenameTemplate: 'http://localhost:8500/[resource]'
  },
  module: {
    rules: [
      {
        oneOf: [babelLoader(false), urlLoaderClient, fileLoaderClient]
      }
    ]
  },
  resolve: {
    alias: {
      'dist': paths.dist,
      'src': paths.src,
      'shared': paths.srcShared,
      'server': paths.srcServer,
      'client': paths.srcClient
      // 'assets': pathList.assets
    },
    extensions: ['.js', '.mjs'],
    mainFiles: ['index'],
    modules: [paths.src, 'node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new LoadablePlugin(),
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify(process.env.NODE_ENV === 'production')
    })
  ]
}


const prodConfig = {
  mode: 'production',
  name: 'client',
  target: 'web',
  entry: {
    bundle: [`${paths.src}/client/index.js`]
  },
  output: {
    path: paths.dist,
    filename: 'bundle.[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: paths.prodPublicPath
  },
  module: {
    rules: [{
      oneOf: [babelLoader(false), urlLoaderClient, fileLoaderClient]
    }]
  },
  resolve: {
    alias: {
      'dist': paths.dist,
      'src': paths.src,
      'shared': paths.srcShared,
      'server': paths.srcServer,
      'client': paths.srcClient
      // 'assets': pathList.assets
    },
    extensions: ['.js', '.mjs'],
    mainFiles: ['index'],
    modules: [paths.src, 'node_modules']
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new LoadablePlugin(),
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify(process.env.NODE_ENV === 'production')
    })
  ],
  optimization: {
    minimizer: [
      new TerserJsPlugin({
        parallel: true,
        cache: true,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
}

module.exports = (env = 'production') => {
  if (env === 'production') {
    return prodConfig
  }
  return devConfig
}