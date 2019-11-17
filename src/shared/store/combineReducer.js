import { combineReducers } from 'redux'
import { authReducer, appReducer, cookieReducer } from 'shared/reducers'

export default combineReducers({
  auth: authReducer,
  data: appReducer,
  cookies: cookieReducer
})