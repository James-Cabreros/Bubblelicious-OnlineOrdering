// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCf9DRXZAshsxGiLYVoVSHq-qz2ZVjaxds',
  authDomain: 'bubblelicious-56b10.firebaseapp.com',
  projectId: 'bubblelicious-56b10',
  storageBucket: 'bubblelicious-56b10.firebasestorage.app',
  messagingSenderId: '898058013404',
  appId: '1:898058013404:web:ed8f562ff77bcc799d4219',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);
auth.languageCode = 'en'; // Set default language for authentication
const provider = new GoogleAuthProvider();

export { auth, provider };
