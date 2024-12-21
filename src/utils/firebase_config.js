import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBlg1QKjkXxUXFAfoc_biWw-515Yw5iqTo",
  authDomain: "clevercv-resume.firebaseapp.com",
  projectId: "clevercv-resume",
  storageBucket: "clevercv-resume.firebasestorage.app",
  messagingSenderId: "405435349497",
  appId: "1:405435349497:web:83c0ce72d3a992b799a528"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { firebaseConfig, auth, app, db, storage };