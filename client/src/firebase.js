import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import * as dotenv from "dotenv";
dotenv.config();

export const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const providerGitHub = new GithubAuthProvider();
const providerFacebook = new FacebookAuthProvider();

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
// Login with GitHub
export const loginGitHub = () => {
  return signInWithPopup(auth, providerGitHub);
};
// Login with Facebook
export const loginFacebook = () => {
  return signInWithPopup(auth, providerFacebook);
};

// // Login with email
// export const login = async (email, password) => {
//   try {
//     const signIn = await signInWithEmailAndPassword(auth, email, password);
//     return signIn;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// // Log out
// export const logOut = async () => {
//   try {
//     const logOff = await signOut(auth);
//     return logOff;
//   } catch (e) {
//     throw e;
//   }
// };

// // Create user with email
// export const createUser = async (email, password) => {
//   try {
//     const signUp = await createUserWithEmailAndPassword(auth, email, password);
//     if (signUp) {
//       sendEmailVerification(auth.currentUser);
//     } else {
//       throw new Error("Error sending verification email");
//     }
//     return signUp;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };



// export const validateUser = () => {
//   if (loggedIn) {
//     return auth.currentUser;
//   } else {
//     throw new Error("No user logged");
//   }
// };
