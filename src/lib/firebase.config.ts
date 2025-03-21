import {initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};




// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db: Firestore = getFirestore(app);
export const storage = getStorage(app);
export default app;



// Your web app's Firebase configuration dwelooproject
// const firebaseConfig = {
//     apiKey: "AIzaSyBuMSOZAACruRhwVOWov89XJwSHr6shYOg",
//     authDomain: "dwelooproject.firebaseapp.com",
//     projectId: "dwelooproject",
//     storageBucket: "dwelooproject.firebasestorage.app",
//     messagingSenderId: "930073221767",
//     appId: "1:930073221767:web:4163166395daff236d3622"
//   };