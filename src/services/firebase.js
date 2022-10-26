import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC4F3sdcplI3NbOVGvWNRBF_T6mNcnqpfg",
  authDomain: "vueflix-58ac5.firebaseapp.com",
  projectId: "vueflix-58ac5",
  storageBucket: "vueflix-58ac5.appspot.com",
  messagingSenderId: "698309238086",
  appId: "1:698309238086:web:8053d2df459c117170d947",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
