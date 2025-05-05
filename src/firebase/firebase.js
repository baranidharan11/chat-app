import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCN82j9SzHwdzfPNT1RkL26WHZ2ynhe7RU",
  authDomain: "chatapp-82529.firebaseapp.com",
  projectId: "chatapp-82529",
  storageBucket: "chatapp-82529.appspot.com", // 🔥 fix this
  messagingSenderId: "83571335145",
  appId: "1:83571335145:web:e661cc1da3256901697578",
  measurementId: "G-8HS2YYYM6H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ export this
