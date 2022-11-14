// Initialize Firebase
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD5vGhNCySwAxFPuJxDjs4EmwhrguYvxo0",
    authDomain: "pruebaproyecto-43e74.firebaseapp.com",
    projectId: "pruebaproyecto-43e74",
    storageBucket: "pruebaproyecto-43e74.appspot.com",
    messagingSenderId: "797146326159",
    appId: "1:797146326159:web:e164f813eaff254eb6fcfa"
  });

const db = firebase.firestore();
const bd = firebaseApp.firestore();
const auth = firebaseApp.auth();

//iniciar sesion con google
function loginGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}