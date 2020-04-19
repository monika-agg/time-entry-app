import react from 'react'
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server'
import paths from '../../paths'
import App from 'shared/App';
import Html from './HTML';
import { Provider } from 'react-redux'
import { checkLogin } from './registerServer'
import Routes, {matchRoute} from 'shared/route'

const setRouteParams = (store, req, res) => {
  // console.log("@@@@@@@@@@", store, req.url, res.locals)
  let search = req.url.split('?')[1] || ''
  search = search.split('#')[0]
  search = search ? `?${search}` : ''
  store.dispatch({
    type: 'UPDATE_ROUTE_PARAMS', payload: {
      query: req.query,
      url: req.url,
      search,
      path: res.locals.path
    }
  })

}
export default async (req, res, next) => {
  const store = res.locals.store
  const {loggedIn} = await store.dispatch(checkLogin()) //performs the login check and set the auth in store
  const routerContext = {}
  const extractor = new ChunkExtractor({ statsFile: paths.stats, entrypoints: ['bundle'] })
  setRouteParams(store, req, res)
  //doing this here and not using redirect inside the compoenent, is to avoid the rendering time when we already know a redirect
  if(req.url !== '/login' && !loggedIn){
    res.redirect(302, '/login')
    return
  } else if(req.url === '/login' && loggedIn){
    res.redirect(302, '/')
    return
  }
  const matchedRouteList = matchRoute(Routes, res.locals.path) //  this list contains a [{route, match}]
  const matches = matchedRouteList.map(({route}) => route) // [route]
  const appContainer = extractor.collectChunks(
    <Provider store={res.locals.store}>
      <Router location={req.url} context={routerContext}>
        <App routes={matches}/>
      </Router>
    </Provider>
  )
  const content = renderToString(appContainer)
  // console.log("context", routerContext)
  // if(routerContext.url){
  //   res.redirect(302, routerContext.url)
  //   return
  // }
  const scriptTags = extractor.getScriptTags()
  const state = res.locals.store.getState()
  return res.send(
    '<!doctype html>' +
    renderToString(
      <Html>
        {content}
      </Html>
    ).replace('__STATE__', JSON.stringify(state).replace(/</g, '\\u003c'))
    .replace('__SCRIPTS__', scriptTags)
  )
}