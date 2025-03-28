import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBDtx2BBdo-3M5uWl1mIM3ry2eSGC8OxJU',
  authDomain: 'fungiguard.firebaseapp.com',
  projectId: 'fungiguard',
  storageBucket: 'fungiguard.firebasestorage.app',
  messagingSenderId: '870726963534',
  appId: '1:870726963534:web:30d60fb59822e425fc0e1f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword };
