// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyB_LE8XKPqbzhm83gbEdXjKe8bbnZ_M-lA',
  authDomain: 'lapunivers-421d1.firebaseapp.com',
  projectId: 'lapunivers-421d1',
  storageBucket: 'lapunivers-421d1.appspot.com',
  messagingSenderId: '489001021602',
  appId: '1:489001021602:web:db4be3624fbe4b2399e7fb',
  measurementId: 'G-02ZYKTV4J7'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
