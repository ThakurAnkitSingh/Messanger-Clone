import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDCnY2XOM_viKx1FgcIxvmnu6bU41Mq6B8",
    authDomain: "unichat-messanger-8804b.firebaseapp.com",
    projectId: "unichat-messanger-8804b",
    storageBucket: "unichat-messanger-8804b.appspot.com",
    messagingSenderId: "803221858205",
    appId: "1:803221858205:web:a373efc1d0003b17ff3174"
}).auth();

