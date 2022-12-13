// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");
require("dotenv").config();
const { FIREBASE_CONFIG } = process.env;

const firebaseConfig = JSON.parse(FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login with email
const login = async (email, password) => {
  const loginUp = await signInWithEmailAndPassword(auth, email, password);
  return loginUp;
};

// Create user with email
const signUp = async (email, password) => {
  const signUp = await createUserWithEmailAndPassword(auth, email, password);
  return signUp;
};

// Export functions for routes
module.exports = { app, auth, login, signUp };
