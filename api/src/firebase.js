// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup
} = require("firebase/auth");
require("dotenv").config();
const { FIREBASE_CONFIG } = process.env;

const firebaseConfig = JSON.parse(FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

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
    throw new Error (error.message)
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
  try {
    const signUp = await createUserWithEmailAndPassword(auth, email, password);
    if(signUp) {
      sendEmailVerification(auth.currentUser)
    } else {
      throw new Error("No sirve")
    }
    return signUp;
    
  } catch (error) {
    throw new Error (error.message)
  }
};

// Validate User
const validateUser = () => {
  if(loggedIn){
    return auth.currentUser
  } else {
    throw new Error("No user logged")
  }
}

// Googule Auth
const providerGoogle = () => {
  try {
    return signInWithPopup(auth, provider);
  } catch (error) {
    throw new Error(error.message)
  }
} 

// Export functions for routes
module.exports = { app, auth, login, signUp, logOut, validateUser, providerGoogle };
