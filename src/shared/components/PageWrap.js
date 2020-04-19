import React, { useMemo } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

const props = ({ auth: { loggedIn = false } }) => ({
  loggedIn
})

export default () => (Comp) => {
  const FetchWrap = (props) => {
    const {
      location: { pathname, search, hash },
      loggedIn,
      match: { url, params },
      history,
      dispatch
    } = props

    const setRouteParams = () => {
      dispatch(
        {
          type: "UPDATE_ROUTE_PARAMS",
          payload: {
            url,
            search,
            path: pathname,
            params
          }
        }
      )
    }

    useMemo(() => {
      setRouteParams()
    }, [pathname, search])

    useEffect(() => {
      console.log("path changes")
    }, [pathname])
  }
  return WithRouter(connect({ props })(FetchWrap))
}

