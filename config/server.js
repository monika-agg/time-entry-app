const path = require('path')
const paths = require('../paths')
var webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
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
    name: 'assets/[name].[hash:8].[ext]',
    emitFile: false
  }
}

const fileLoaderClient = {
  test: /\.(png|jpe?g)$/,
  loader: 'file-loader',
  options: {
    name: 'assets/[name].[hash:8].[ext]',
    emitFile: false,
  }
}

const devConfig = {
  mode: 'development',
  name: 'server',
  target: 'node',
  entry: {
    bundle: [`${paths.src}/server/index.js`]
  },
  output: {
    path: path.join(paths.dist, '/server'),
    filename: 'server.js',
    publicPath: paths.publicPath
  },
  module: {
    rules: [
      {
        oneOf: [babelLoader(true), urlLoaderClient, fileLoaderClient]
      }
    ]
  },
  externals: [
    nodeExternals({
      whitelist: /\.css$/
    })
  ],
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
    // mainFiles: ['index'],
    mainFields: ['main', 'module'],
    modules: [paths.src, 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      __SERVER__: 'true',
      __PROD__: JSON.stringify(process.env.NODE_ENV === 'production')
    })
  ],
  stats: {
    colors: true
  }
}

const prodConfig = {
  ...devConfig,
  mode: 'production',
  output: {
    ...devConfig.output,
    publicPath: paths.prodPublicPath
  }
}

module.exports = (env = "production") => {
  if (env === 'production') {
    return prodConfig
  }
  return devConfig
}