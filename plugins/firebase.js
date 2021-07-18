import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: process.env.apikey,
  authDomain: "nuxt--313607.firebaseapp.com",
  databaseURL: "https://nuxt--313607-7fba9.asia-southeast1.firebasedatabase.app",
  projectId: "nuxt-youtube-313607",
  storageBucket: "nuxt-youtube-313607.appspot.com",
  messagingSenderId: "748419381762",
  appId: "1:748419381762:web:573311baa73fe93646851b",
  measurementId: "G-3M8HWVB24C"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

// var commentsRef = firebase.database().ref('users');
// commentsRef.on('child_added', (data) => {
//   console.log(data)
// });

// commentsRef.on('child_changed', (data) => {
//   console.log(data)
// });

// commentsRef.on('child_removed', (data) => {
//   console.log(data)
// });


export default firebase