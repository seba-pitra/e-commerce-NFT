import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import * as dotenv from 'dotenv'
dotenv.config();

export const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginGoogle = () => {
  return signInWithPopup(auth, provider);
}


