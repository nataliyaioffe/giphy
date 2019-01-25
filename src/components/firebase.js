import firebase from "firebase";

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDPQopyh6endwCGM_cs0jQD29viyETWnxY",
    authDomain: "giphy-d49ca.firebaseapp.com",
    databaseURL: "https://giphy-d49ca.firebaseio.com",
    projectId: "giphy-d49ca",
    storageBucket: "giphy-d49ca.appspot.com",
    messagingSenderId: "350938955343"
};

firebase.initializeApp(config);

export default firebase;
