import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyASOL5YqYWvhKVdD6aTYsYifl9oljIO_Zg",
  authDomain: "eft-redeem-code.firebaseapp.com",
  databaseURL: "https://eft-redeem-code-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eft-redeem-code",
  storageBucket: "eft-redeem-code.firebasestorage.app",
  messagingSenderId: "98805584959",
  appId: "1:98805584959:web:c27cfd89a2657d8d53148a"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
