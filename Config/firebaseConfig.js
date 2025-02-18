import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);
 
export { app, auth, db, storage };
