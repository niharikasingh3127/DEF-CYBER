import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Your web app's Firebase configuration

  apiKey: "AIzaSyBlZLy6XlPZav0uMSoWxKiCTWnJONyluDo",
  authDomain: "defence-portal-db-e0ce1.firebaseapp.com",
  projectId: "defence-portal-db-e0ce1",
  storageBucket: "defence-portal-db-e0ce1.firebasestorage.app",
  messagingSenderId: "449094709710",
  appId: "1:449094709710:web:9fe78599009c9c1d6fbb9f"
};


const app = initializeApp(firebaseConfig);

// --- THIS IS THE CRITICAL PART ---
export const db = getFirestore(app);