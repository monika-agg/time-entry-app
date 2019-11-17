module.exports = (env = 'production') => {
  if (env === 'development') {
    process.env.NODE_ENV = 'development'
    return [require('./client.js')('development'), require('./server.js')('development')]
  } else {
    process.env.NODE_ENV = 'production'
    return [require('./client.js')(), require('./server.js')()]
  }
}
