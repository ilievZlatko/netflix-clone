// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB0T9ECxYesDPVRKkQdU6iMk02QfkC7puQ',
  authDomain: 'netflix-clone-9dc67.firebaseapp.com',
  // databaseURL: 'https://next-firebase-stripe-39bf8-default-rtdb.firebaseio.com',
  projectId: 'netflix-clone-9dc67',
  storageBucket: 'netflix-clone-9dc67.appspot.com',
  messagingSenderId: '529535091221',
  appId: '1:529535091221:web:cba66ae01a52bdd912041c',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
