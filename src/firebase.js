import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAvixTfAeQH3Xhb5yXoZK8GZnkwBvPk9Ek",
    authDomain: "todo-app-315a7.firebaseapp.com",
    projectId: "todo-app-315a7",
    storageBucket: "todo-app-315a7.appspot.com",
    messagingSenderId: "294610193313",
    appId: "1:294610193313:web:4e6d88437b6bc1f800d9e0"
});
const db = firebaseApp.firestore();    //This will create a database in firebase.
// const auth = firebase.auth(); 
// const storage = firebase.storage();
export default db;                  //Through this line now we can import db variable anywhere in our code and then access the database.

