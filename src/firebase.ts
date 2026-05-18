import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDKCCYzvCKWD5Z7PughlUMd552_YZDyDFE",
  authDomain: "eft-uin-suka.firebaseapp.com",
  databaseURL: "https://eft-uin-suka-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eft-uin-suka",
  storageBucket: "eft-uin-suka.firebasestorage.app",
  messagingSenderId: "232770363304",
  appId: "1:232770363304:web:fee223bcaf7542aa2c879d",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
