import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDM220RXcOTwIpRK8uxv5XwhSOcdcg03-k",
  authDomain: "https://clevercv-resume01.netlify.app/",
  projectId: "clevercv-d6428",
  storageBucket: "clevercv-d6428.firebasestorage.app",
  messagingSenderId: "860320432541",
  appId: "1:860320432541:web:c6f56ba0b392e2d1a4ef74"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { firebaseConfig, auth, app, db, storage };