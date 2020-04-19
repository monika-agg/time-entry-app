import React from 'react'
import connect from 'shared/connect'
import { signOut } from 'shared/actions/auth'
import { title, headerContainer, btnCont } from 'src/shared/components/style'


const Header = ({ children, signOut,  loggedIn, history}) => {
  return <header css={headerContainer}>
    <div css={title}>Time Entry App</div>
    <div css={btnCont}>
      {children}
      {loggedIn && <button onClick={() => signOut().then(_ => history.push('/login'))}>Sign out</button>}
    </div>
  </header>
}

const props = ({auth: {loggedIn = false}}) => ({loggedIn})
export default connect({props, actions: {signOut}})(Header)
