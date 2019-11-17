import * as admin from 'firebase-admin';

export const registerToFirebase = () => {
  console.log("initailaizing firebase admin")
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://tasklist-2be89.firebaseio.com'
  });
}

export const checkLogin = () => (dispatch, getState) => {

  const {
    cookies: { token }
  } = getState()
  if (!token) {
    return Promise.resolve({})
  } else {
    dispatch({ type: 'LOGIN', payload: { loggedIn: true } })
  }
  // else {
  //   return admin.auth().verifyIdToken(token).then((decodedToken) => {
  //     console.log("token verifies", decodedToken.uid)
  //     dispatch({ type: 'LOGIN', payload: { loggedIn: true } })
  //   }).catch((error) => {
  //     console.log("error", error)
  //     dispatch({ type: 'LOGIN', payload: { loggedIn: false } })
  //   })
  // }
}