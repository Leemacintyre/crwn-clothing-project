import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6XTUtVca52i2YDvpdpgAoKSp0zCGKkY8",
  authDomain: "crown-db-c40ea.firebaseapp.com",
  projectId: "crown-db-c40ea",
  storageBucket: "crown-db-c40ea.appspot.com",
  messagingSenderId: "446031454707",
  appId: "1:446031454707:web:71048df68b6808309db286",
  measurementId: "G-R0Z6NV6WC7",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
