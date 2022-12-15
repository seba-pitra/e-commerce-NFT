// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} = require("firebase/auth");
require("dotenv").config();
const { FIREBASE_CONFIG } = process.env;

const firebaseConfig = JSON.parse(FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let loggedIn= false

onAuthStateChanged(auth, (user)=>{
  if(user){
    loggedIn=true
  } else {
    loggedIn=false
  }
})

// Login with email
const login = async (email, password) => {
  try{
    const loginUp = await signInWithEmailAndPassword(auth, email, password);
    return loginUp;
  } catch (error) {
    throw error
  }
};


const logOut = async () => {
  try{
    signOut(auth)
    return "Done"
  } catch (e) {
    throw e
  }
}

// Create user with email
const signUp = async (email, password) => {
  const signUp = await createUserWithEmailAndPassword(auth, email, password);
  if(signUp) {
    sendEmailVerification(auth.currentUser)
  } else {
    throw new Error("No sirve")
  }
  return signUp;
};

// Validate User
const validateUser = () => {
  if(loggedIn){
    return auth.currentUser
  } else {
    throw new Error("No user logged")
  }
}

// Export functions for routes
module.exports = { app, auth, login, signUp, logOut, validateUser };
