import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { getStorage,ref } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAFxCOcN_zOeZpkirjmMVtPfzD3NH6q-g8",
  authDomain: "pgscout-7bc29.firebaseapp.com",
  projectId: "pgscout-7bc29",
  storageBucket: "pgscout-7bc29.appspot.com",
  messagingSenderId: "436091904656",
  appId: "1:436091904656:web:02bc631d45c112c177ae15"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getFirestore(app);
export const storage = getStorage(app);
export const db = getDatabase();
export const deleteDocument = (collectionName, docId) => {
    return deleteDoc(doc(database, collectionName, docId));
  };