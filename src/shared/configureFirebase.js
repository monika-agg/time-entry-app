import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyDVJLLBWIhjVU5ogm2GtyALnADZdJ_z_lU",
  authDomain: "tasklist-2be89.firebaseapp.com",
  databaseURL: "https://tasklist-2be89.firebaseio.com",
  projectId: "tasklist-2be89",
  storageBucket: "tasklist-2be89.appspot.com",
  messagingSenderId: "493798251149"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
