var webpack = require('webpack')
var path = require('path')
var paths = require('../paths')
var [clientConfig, serverConfig] = require('../config/webpack.config.js')(process.env.NODE_ENV || 'production')
const rimraf = require('rimraf')


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

process.on('uncaughtException', function (err) {
  console.log('Uncaught Exception', err.message, err.stack)
})

process.on('unhandledRejection', function (err) {
  console.log('Uncaught Rejection', err.message, err.stack)
})

const build = async () => {
  rimraf.sync(paths.dist)
  const multiCompiler = webpack([clientConfig, serverConfig])

  const clientCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'client')
  const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server')

  const clientPromise = compilerPromise('client', clientCompiler)
  const serverPromise = compilerPromise('server', serverCompiler)

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats))
    }
  })

  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats))
    }
  })

  try {
    await clientPromise
    await serverPromise
    process.exit()
  } catch (error) {
    console.log(error, 'sdkldhaldjq')
    process.exit(1)
  }
}

build()