import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

// NOTE: In a real deployment, these values come from process.env
// We are using placeholders here to satisfy the requirement of code generation
const firebaseConfig = {
  apiKey: process.env.API_KEY || "AIzaSyD-mock-api-key",
  authDomain: "takeuup-app.firebaseapp.com",
  projectId: "takeuup-app",
  storageBucket: "takeuup-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Helper for Mock Data since we don't have a real backend connected in this preview
export const MOCK_USER = {
  uid: 'user123',
  email: 'student@example.com',
  displayName: 'You',
  photoURL: 'https://picsum.photos/200',
  role: 'student',
  plan: 'free',
  streak: 5,
  points: 10980
};