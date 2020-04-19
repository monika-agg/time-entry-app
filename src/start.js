var webpack = require('webpack')
const shell = require('shelljs')
const nodemon = require('nodemon')
var path = require('path')
var paths = require('../paths')
var [clientConfig, serverConfig] = require('../config/webpack.config.js')("development")
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
const rimraf = require('rimraf')
const express = require('express')

const app = express()
const WEBPACK_PORT = process.env.WEBPACK_PORT || (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501)

const compilerPromise = (name, compiler) => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      console.log(`[${name}] Compiling `)
    })
    compiler.hooks.done.tap(name, (stats) => {
      if (!stats.hasErrors()) {
        return resolve()
      }
      return reject(`Failed to compile ${name}`)
    })
  })
}

const start = async () => {
  rimraf.sync(paths.dist)

  clientConfig.entry.bundle = [
    `webpack-hot-middleware/client?path=http://localhost:${WEBPACK_PORT}/__webpack_hmr`,
    ...clientConfig.entry.bundle
  ]
  clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json'
  clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js'

  const publicPath = clientConfig.output.publicPath
  clientConfig.output.publicPath = [`http://localhost:${WEBPACK_PORT}`, publicPath]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/')

  serverConfig.output.publicPath = [`http://localhost:${WEBPACK_PORT}`, publicPath]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/')

  const multiCompiler = webpack([clientConfig, serverConfig])

  const clientCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'client')
  const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server')

  const clientPromise = compilerPromise('client', clientCompiler)
  const serverPromise = compilerPromise('server', serverCompiler)

  app.use(webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    writeToDisk: true
  }))

  app.use(webpackHotMiddleware(clientCompiler))

  app.listen(WEBPACK_PORT, () => {
    console.log('server is started on port', WEBPACK_PORT)
  })

  serverCompiler.watch({
    ignored: /node_modules/,
    stats: clientConfig.stats
  }, (error, stats) => {
    if (stats.hasErrors()) {
      const info = stats.toJson()
      const errors = info.errors[0].split('\n')
      console.log(errors[0], 'error')
      console.log(errors[1], 'error')
      console.log(errors[2], 'error')
    } else if (!error) {
      console.log(stats.toString(serverConfig.stats))
    }
  })

  try {
    await clientPromise
    await serverPromise
  } catch (error) {
    console.log(error, 'error')
  }
  console.log("paths.buildServer", paths.buildServer)
  const script = nodemon(
    `--delay 100ms --ignore "src scripts config ./*.*" --inspect ${paths.buildServer}/server.js`
  )

  script.on('restart', () => {
    console.log('Server side app has been restarted.', 'warning')
  })

  script.on('quit', () => {
    console.log('Process ended')
    process.exit()
  })

  script.on('error', () => {
    console.log('An error occured. Exiting', 'error')
    process.exit(1)
  })
}

start()