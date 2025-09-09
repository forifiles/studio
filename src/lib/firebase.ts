import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQDpBREhWI569dm1Yzf1Tbgv0seJgvmWI",
  authDomain: "assureview.firebaseapp.com",
  projectId: "assureview",
  storageBucket: "assureview.firebasestorage.app",
  messagingSenderId: "534692594790",
  appId: "1:534692594790:web:697d9b7fd4af5fbb0ad9a7",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };
