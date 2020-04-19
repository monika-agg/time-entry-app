import React, { useState, Fragment } from 'react'
import connect from './connect'
import { Core } from 'src/shared/components/style'
import { withRouter } from 'react-router-dom'
import {renderRoutes} from 'shared/route'


const App = ({routes}) => {
  return (
    <Fragment>
        {renderRoutes(routes)}
      <Core />
    </Fragment>
  )
}
const props = ({ auth: { loggedIn } }) => ({ loggedIn })
export default withRouter(connect({ props})(App))
