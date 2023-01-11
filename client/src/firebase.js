import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import * as dotenv from "dotenv";
dotenv.config();


// export const firebaseConfig = JSON.parse(
//   process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_CONFIG
// );

export const firebaseConfig = require("./firebaseConfig.json");


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Validate User
export let loggedIn = false;
onAuthStateChanged(auth, (user) => {
  if (user) {
    loggedIn = true;
  } else {
    loggedIn = false;
  }
});

// Login with Google
export const loginGoogle = () => {
  return signInWithPopup(auth, provider);
};
