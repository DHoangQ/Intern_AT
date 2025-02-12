import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAIcvQm2BYN734jvDW2TuVfWtdF6wPrhZc",
    authDomain: "accesstrade-c67d8.firebaseapp.com",
    projectId: "accesstrade-c67d8",
    storageBucket: "accesstrade-c67d8.appspot.com",
    messagingSenderId: "1029467969131",
    appId: "1:1029467969131:android:aa6b967b25763e412d032e"
};
 
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
