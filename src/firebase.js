import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3ZyKCVRC1tM31NWP0a-bIcHVzk16pxqU",
  authDomain: "savelink-bd88a.firebaseapp.com",
  projectId: "savelink-bd88a",
  storageBucket: "savelink-bd88a.appspot.com",
  messagingSenderId: "185528874609",
  appId: "1:185528874609:web:75a7778d9660093a580dd0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
