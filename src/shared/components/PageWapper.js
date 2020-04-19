import React, { Fragment } from 'react'
import connect from 'shared/connect'
import Header from './Header'
import { Redirect, Route } from 'react-router-dom';

const props = ({auth: {loggedIn}}) => ({loggedIn})

const PageWrapper = (PageType) => (Comp) => {
    const NewComp =  (props) => {
        const {
            loggedIn,
            history
        } = props
        if(loggedIn){
            return <Fragment>
                <Header history={history}>
                    {PageType==='ADDITEM' && <button onClick={() => history.push('/report')}>View Tasks</button>}
                    {PageType === 'REPORT' && <button onClick={() => history.push('/')}>Add Task</button>}
                </Header>
                <Comp {...props}/>
            </Fragment>
        } else {
            return <Redirect to='/login'/>
            // return <Route render={({staticContext}) => {
            //     if(staticContext){
            //         staticContext.status = 302
            //     }
            //     return <Redirect to='/login'/>
            // }}></Route>
        } 
        
    }
    return connect({ props})(NewComp)
}

export default PageWrapper
