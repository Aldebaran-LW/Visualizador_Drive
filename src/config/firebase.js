// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDkqKtL4VtaykNWCho9Ozj3mTRKQNEUPQ",
  authDomain: "lwdigitalforge-577c4.firebaseapp.com",
  projectId: "lwdigitalforge-577c4",
  storageBucket: "lwdigitalforge-577c4.firebasestorage.app",
  messagingSenderId: "469330532024",
  appId: "1:469330532024:web:63e82bfb45e85066a2464d",
  measurementId: "G-H5PNKTC109"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Add scopes for Google Drive access
googleProvider.addScope('https://www.googleapis.com/auth/drive.readonly');
googleProvider.addScope('https://www.googleapis.com/auth/drive.file'); // Para modificar permissões

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics, auth, googleProvider };

