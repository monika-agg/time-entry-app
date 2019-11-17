import firebase from 'shared/configureFirebase'

export const login = (email, password) => (dispatch, getState, { setCookie }) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch({ type: 'LOGIN', payload: { loggedIn: true } })
      return firebase.auth().currentUser.getIdToken().then(token => {
        // dispatch({ type: 'TOKEN_RETRIVED_SUCCESS', payload: { token } })
        setCookie('token', token)
      }).catch(error => { })
    })
    .catch(error => {
      let errorMessage
      switch (error.code) {
        case 'auth/weak-password':
          errorMessage = 'The password is too weak.'
          break
        default:
          errorMessage = error.message
      }
      dispatch({ type: 'LOGIN_FAILED', payload: { errorMessage } })
    });
}

export const register = (email, password) => (dispatch) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({ type: 'REGISTER_SUCCESS', payload: { errorMessage: '' } })
      return 'success'
    })
    .catch(error => {
      let errorMessage
      switch (error.code) {
        case 'auth/weak-password':
          errorMessage = 'The password is too weak.'
          break
        default:
          errorMessage = error.message
      }
      dispatch({ type: 'REGISTER_FAILED', payload: { errorMessage } })
    })
}

export const signOut = () => (dispatch, getState, { clearCookie }) => {
  console.log("helper", clearCookie)
  return firebase.auth().signOut().then(() => {
    clearCookie('token')
    dispatch({ type: 'LOGIN', payload: { loggedIn: false } })
  }).catch(() => {
    dispatch({ type: 'SIGNOUT_FAILED', payload: { errorMessage: 'Failed to Signout' } })
  })
}