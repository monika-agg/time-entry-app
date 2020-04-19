import firebase from 'shared/configureFirebase'

export const createEntry = ({ name, project, startTime, endTime }) => (dispatch) => {
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('entries/' + userId).push().set({
    taskName: name,
    project,
    startTime,
    endTime
  }).then((success) => {
    console.log('sucess', success);
  }).catch(error => {
    console.log('failed to create an entry')
  })
}

export const fetchList = () => (dispatch) => {
  var userId = firebase.auth().currentUser.uid;
  const ref = firebase.database().ref('entries/' + userId)
  return new Promise((resolve, reject) => {
    ref.once('value', (snapshot) => {
      let entries = {}
      snapshot.forEach(childSnapshot => {
        var childKey = childSnapshot.key
        var childData = childSnapshot.val()
        childData.startTime = new Date(childData.startTime)
        childData.endTime = new Date(childData.endTime)
        entries[childKey] = childData
      })
      dispatch({ type: 'TASKLIST', payload: entries })
      resolve(entries)
    })
  })
}