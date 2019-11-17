import cookie from 'cookie'

function writeCookie(key, value, opts) {
  if (typeof window === 'undefined') {
    return
  }
  opts = { ...opts }

  if (window && window.document) {
    window.document.cookie = cookie.serialize(key, value, opts)
  }
}

function cookieOptions(time) {
  const options = {
    path: '/',
    domain: `localhost`
  }

  if (time) {
    options.expires = new Date(Date.now() + time * 86400000)
  }

  return options
}

function parse(val) {
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

export const getCookieHelpers = () => (dispatch) => {
  return {
    setCookie: (key, val, opts = {}) => {
      writeCookie(key, val, { ...cookieOptions(), ...opts })
      dispatch({ type: 'SET_COOKIE', payload: { key, val: parse(val), opts } })
    },
    clearCookie: (key) => {
      document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      dispatch({ type: 'CLEAR_COOKIE', payload: { key } })
    },
    syncCookies: () => {
      const cookies = cookie.parse(document.cookie)
      Object.keys(cookies).forEach((key) => {
        cookies[key] = parse(cookies[key])
      })
      dispatch({ type: 'SET_COOKIES', payload: cookies })
    }
  }
}