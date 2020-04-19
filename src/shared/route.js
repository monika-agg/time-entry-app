import { matchPath, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component'

const route = [{
    path: '/Login',
    component: loadable(() => import(/* webpackChunkName: "login" */'./components/Login')),
    exact: true,
    name: 'login'
}, {
    path: '/report',
    component: loadable(() => import(/* webpackChunkName: "report" */'./components/Report')),
    exact: true,
    name: 'report'
}, {
    path: '/',
    component: loadable(() => import(/* webpackChunkName: "AddItem" */'./components/AddItem')),
    exact: true,
    name: 'home'
}]

export const renderRoutes = (routes,extraProps= {}, switchProps ={}) => {
    return routes ? 
    (<Switch {...switchProps}>
        {
            routes.map((route, index) => <Route
            key={route.name}
            path={route.path}
            exact={route.exact}
            sensitive={route.sensitive}
            render={(props) => {
                return <route.component {...props} {...extraProps} />
            }}
        />)
        }
    </Switch>) : null
}

export const matchRoute = (routes, path, branch=[]) => {
    routes.some(route => {
        const match = matchPath(path, route)
       if(match){
           branch.push({route, match})
       }
       return match
    })
    return branch
}

export default route