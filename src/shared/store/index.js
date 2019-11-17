import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './combineReducer'
// const reducer = (state, action) => ({ loggedIn: false })

export default function configureStore(initialState = {}, extraParams = {}) {
  let enhancer = applyMiddleware(thunk.withExtraArgument(extraParams))
  if (typeof window !== 'undefined' && !__PROD__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(enhancer)
  }
  const store = createStore(reducer, initialState, enhancer)
  return store
}
