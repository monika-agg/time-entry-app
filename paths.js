var path = require('path')
const fs = require('fs')
const appDirectory = fs.realpathSync(process.cwd())
const getPathFromRoot = (relativePath) => path.resolve(appDirectory, relativePath)

var pathList = {
  srcClient: getPathFromRoot('./src/client'),
  srcShared: getPathFromRoot('./src/shared'),
  srcServer: getPathFromRoot('./src/server'),
  buildServer: getPathFromRoot('./dist/server'),
  src: getPathFromRoot('./src'),
  dist: getPathFromRoot('./dist'),
  stats: getPathFromRoot('dist/loadable-stats.json'),
  publicPath: '/',
  prodPublicPath: '/static/'
  // assets: getPathFromRoot('./src/assets')
}

module.exports = pathList