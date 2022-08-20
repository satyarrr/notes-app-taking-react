import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmm6c-JJey-4CGaZSx1w0f-J2DVxtyolc",
  authDomain: "note-taking-app-react.firebaseapp.com",
  projectId: "note-taking-app-react",
  storageBucket: "note-taking-app-react.appspot.com",
  messagingSenderId: "452355406080",
  appId: "1:452355406080:web:2c986bb694d8c5565edbe5",
  measurementId: "G-QK6LS3C2GZ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

