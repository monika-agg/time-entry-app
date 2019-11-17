import React, { useState } from 'react'
import connect from './connect'
import Login from './components/Login'
import AddItem from './components/AddItem'
import Report from './components/Report'
import Header from './components/Header'
import {Core} from 'src/shared/components/style'
import { signOut } from 'shared/actions/auth'
const projectList = [{
  key: 'project1',
  label: 'project 1'
}, {
  key: 'project2',
  label: 'project 2'
}, {
  key: 'project3',
  label: 'project 3'
}]
const App = ({ loggedIn, signOut }) => {
  const [showReport, setShowReport] = useState(false)
  if (!loggedIn) {
    return (
      <React.Fragment>
        <Login />
        <Core />
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <Header>
        {showReport && <button onClick={() => setShowReport(false)}>Add Task</button>}
        {!showReport && <button onClick={() => setShowReport(true)}>View Tasks</button>}
        <button onClick={() => signOut()}>Sign out</button>
      </Header>
      {
        !showReport && <AddItem projectList={projectList} />
      }
      {
        showReport && <Report />
      }
      <Core />
    </React.Fragment>
  )
}
const props = ({ auth: { loggedIn } }) => ({ loggedIn })
export default connect({ props, actions: {signOut} })(App)
