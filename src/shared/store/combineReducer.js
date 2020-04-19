import { combineReducers } from 'redux'
import { authReducer, appReducer, cookieReducer, routeReducer } from 'shared/reducers'

export default combineReducers({
  auth: authReducer,
  data: appReducer,
  cookies: cookieReducer,
  route: routeReducer
})