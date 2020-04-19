import React, { Fragment, useState } from 'react'
import { login, register } from 'shared/actions/auth'
import connect from 'shared/connect'
import Header from 'src/shared/components/Header'
// import PageWrap from 'src/shared/components/PageWrap'
import { loginContainer, loginBtn, errorStyle } from 'src/shared/components/style'

const SCREEN = {
  REGISTER: 'register',
  LOGIN: 'login'
}

const AuthComponent = (props = {}) => {
  const { login, register, errorMessage } = props
  const [{ email = '', password = '' }, setState] = useState({})
  const [screen, setScreen] = useState(SCREEN.LOGIN)

  function onChange(field, value) {
    setState(prev => ({
      ...prev,
      [field]: value
    }));
  }

  function onSubmit() {
    const {history} = props
    if (screen === SCREEN.LOGIN) {
      login(email, password).then(_ => {
        history.push('/')
      })
    } else {
      register(email, password).then(status => {
        if (status === 'success') {
          changeScreen()
        }
      })
    }
  }

  function changeScreen() {
    let newScreen
    newScreen = screen === SCREEN.REGISTER ? SCREEN.LOGIN : SCREEN.REGISTER
    setScreen(newScreen)
  }
  return (
    <Fragment>
      <Header>
        {screen !== SCREEN.LOGIN && <button onClick={() => changeScreen()}>Login</button>}
        {screen === SCREEN.LOGIN && <button onClick={() => changeScreen()}>Register</button>}
      </Header>
      <div css={loginContainer}>
        <label>Email</label>
        <input type='email' onChange={({ target: { value } }) => onChange('email', value)} value={email} />
        <label>Password</label>
        <input type='password' onChange={({ target: { value } }) => onChange('password', value)} value={password} />
        <button css={loginBtn} onClick={() => onSubmit()}>{screen}</button>
        {
          errorMessage && <span css={errorStyle}>{errorMessage}</span>
        }
      </div>
    </Fragment>
  )
}

const props = ({ auth: { errorMessage } }) => ({ errorMessage })

export default connect({ props, actions: { login, register } })(AuthComponent)
