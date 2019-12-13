import cookie from 'cookie'

export function cookieOptions(time) {
  const options = {
    path: '/',
    domain: `.herokuapp.com`
  }

  if (time) {
    options.expires = new Date(Date.now() + time * 86400000)
  }

  return options
}

export function parse(val) {
  if (typeof val === 'string') {
    let jsonCookie = false
    try {
      // removing j: for express JSON cookies
      val = JSON.parse(val.replace(/j:/, ''))
      jsonCookie = true
    } catch (e) { }
    if (!jsonCookie) {
      const parsedCookieObj = cookie.parse(val)
      val = Object.keys(parsedCookieObj).length ? parsedCookieObj : val
    }
  }
  return val
}

export function getCookieHelpers(req, res) {
  return {
    setCookie: (key, val, opts = {}) => {
      res.cookie(key, val, { ...cookieOptions(), ...opts })
      res.locals.cookies[key] = parse(val)
    },
    clearCookie: (key) => {
      res.clearCookie(key)
      res.locals.cookies[key] = null
    }
  }
}