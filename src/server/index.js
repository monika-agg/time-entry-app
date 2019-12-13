import path from 'path'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import render from './render'
import { registerToFirebase } from './registerServer'
import configureStore from 'shared/store'
import { getCookieHelpers, parse } from 'server/cookieParser'
import paths from '../../paths'

require('dotenv').config();
const app = express();
registerToFirebase()

app.use(paths.prodPublicPath, express.static(paths.dist))

app.use(cors());
app.use((req, res, next) => {
  cookieParser()(req, res, () => {
    const cookies = { ...req.cookies }
    Object.keys(cookies).forEach((key) => {
      cookies[key] = parse(cookies[key])
    })
    res.locals.cookies = cookies
    next()
  })
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const helpers = {}
  res.locals.helpers = helpers
  res.locals.store = configureStore({}, helpers)
  next()
})
app.use((req, res, next) => {
  const {
    locals: { store, helpers, cookies }
  } = res
  const { setCookie, clearCookie } = getCookieHelpers(req, res)
  helpers.setCookie = (key, val, opts) => {
    if (res.headersSent) {
      return
    }
    setCookie(key, val, opts)
    // check if opts are required
    store.dispatch({
      type: 'SET_COOKIE',
      payload: { key, val: parse(val), opts }
    })
  }
  helpers.clearCookie = (key) => {
    if (res.headersSent) {
      return
    }
    clearCookie(key)
    store.dispatch({ type: 'CLEAR_COOKIE', payload: { key } })
  }
  store.dispatch({ type: 'SET_COOKIES', payload: cookies })
  next()
})
app.use(render);

process.on('uncaughtException', function (err) {
  console.log('Uncaught Exception', err.message, err.stack)
})

process.on('unhandledRejection', function (err) {
  console.log('Uncaught Rejection', err.message, err.stack)
})

let port = process.env.PORT || 8500
app.listen(port, () => {
  console.log(`Server started on PORT ${port}`)
})

export default app