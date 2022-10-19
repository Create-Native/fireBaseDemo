import {initializeApp} from 'firebase/app'
import {getFirestore, collection, query, addDoc, onSnapshot, serverTimestamp, orderBy} from 'firebase/firestore'
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbJQnf9xIj0mTzplCfzqUVh0nn2PfYqbc",
    authDomain: "fir-877f6.firebaseapp.com",
    projectId: "fir-877f6",
    storageBucket: "fir-877f6.appspot.com",
    messagingSenderId: "158328742148",
    appId: "1:158328742148:web:49799866eced4e8454b051"
  };

  initializeApp(firebaseConfig)

  const firestore = getFirestore()

  const MESSAGES = 'messages'

  export {
    firestore, 
    collection,
    addDoc,
    serverTimestamp,
    orderBy,
    MESSAGES,
    query,
    onSnapshot,
    getAuth,
    signInWithEmailAndPassword,
  }