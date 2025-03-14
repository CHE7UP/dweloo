import {initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuMSOZAACruRhwVOWov89XJwSHr6shYOg",
    authDomain: "dwelooproject.firebaseapp.com",
    projectId: "dwelooproject",
    storageBucket: "dwelooproject.firebasestorage.app",
    messagingSenderId: "930073221767",
    appId: "1:930073221767:web:4163166395daff236d3622"
  };

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db: Firestore = getFirestore(app);
export default app;