import { initializeApp, getApps } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";


export const firebaseConfig = {
  apiKey: String(process.env.EXPO_PUBLIC_FIREBASE_API_KEY),
  authDomain: String(process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: String(process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.EXPO_PUBLIC_FIREBASE_APP_ID),
};

console.log('firebaseConfig', firebaseConfig)

function checkFirebaseInit() {
  if (getApps().length === 0) {
    const app = initializeApp(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
    // console.log(getApps().length ? 'Firebase Mode Activated!' : 'Firebase not working :(');
    return app
  } else {
    return;
  }
}

const app = checkFirebaseInit();
const auth = getAuth(app);
const db = initializeFirestore(app!, { experimentalForceLongPolling: true });
// const db = getFirestore();
const storage = getStorage(app, process.env.FIREBASE_STORAGEBUCKET);





export { auth, db, app, firebase, storage };
