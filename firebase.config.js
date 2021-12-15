// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDnHmNwR9J2T-VSNn9lnyKdG1kmznMfUcU',
  authDomain: 'isporit.firebaseapp.com',
  databaseURL: 'https://isporit.firebaseio.com',
  projectId: 'isporit',
  storageBucket: 'isporit.appspot.com',
  messagingSenderId: '699215576608',
  appId: '1:699215576608:web:ba02069dfbbb4f684f0645',
}

// Initialize Firebase
const firebaseDb = initializeApp(firebaseConfig)

export default getFirestore()
