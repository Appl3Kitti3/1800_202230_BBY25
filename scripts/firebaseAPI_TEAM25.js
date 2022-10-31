//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyBYGkV1b1RA6WZEBbraNgeMFOs5psZqbx8",
    authDomain: "moodup-e8744.firebaseapp.com",
    projectId: "moodup-e8744",
    storageBucket: "moodup-e8744.appspot.com",
    messagingSenderId: "283918345875",
    appId: "1:283918345875:web:5438cf58c658a314234f66"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();