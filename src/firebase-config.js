
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCJhWhdPESzHvW-9dJzTcN8uZU3ros-zf0",
  authDomain: "runaway-c66be.firebaseapp.com",
  projectId: "runaway-c66be",
  storageBucket: "runaway-c66be.appspot.com",
  messagingSenderId: "68448341222",
  appId: "1:68448341222:web:2224f95c2d2cf25c1cff27",
  measurementId: "G-1Q5ZT4WH4R",
  databaseURL:"https://runaway-c66be-default-rtdb.firebaseio.com"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();