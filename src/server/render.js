import react from 'react'
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server'
import paths from '../../paths'
import App from 'shared/App';
import Html from './HTML';
import { Provider } from 'react-redux'
import { checkLogin } from './registerServer'

export default async (req, res, next) => {
  const store = res.locals.store
  await store.dispatch(checkLogin())
  const routerContext = {}
  const extractor = new ChunkExtractor({ statsFile: paths.stats, entrypoints: ['bundle'] })
  const appContainer = extractor.collectChunks(
    <Provider store={res.locals.store}>
      <Router location={req.url} context={routerContext}>
        <App />
      </Router>
    </Provider>
  )
  const content = renderToString(appContainer)
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