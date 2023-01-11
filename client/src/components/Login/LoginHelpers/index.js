import { auth, loginGoogle } from "../../../firebase.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { handleErrorLoginAndRegister } from "../../../utils/index.js";

export const signGoogle = async () => {
  try {
    await loginGoogle();

    const user = {
      id: auth.currentUser.uid,
      email: auth.currentUser.email,
      username: auth.currentUser.displayName + Math.random() * 100000,
      profile_pic: auth.currentUser.photoURL,
    };

    return user;
  } catch (error) {
    handleErrorLoginAndRegister(error);
  }
};
/**
 *
 * @param {object} logginForm - the loggin form with email and password properties to pass to firebase.
 * @returns the user from the firebase response.
 */
export const logginFunction = async (logginForm) => {
  try {
    const responseFirebase = await signInWithEmailAndPassword(
      auth,
      logginForm.email,
      logginForm.password
    );

    if (
      !responseFirebase.user.emailVerified &&
      responseFirebase.user.uid !== "zbhAE68vRxVetZpviZWSsuv4zfh1"
    ) {
      let err = { code: "Email not verified" };
      throw err;
    }

    localStorage.setItem(
      "User",
      JSON.stringify({
        id: auth.currentUser.uid,
        email: auth.currentUser.email,
        username: auth.currentUser.displayName + Math.random() * 100000,
        profile_pic: auth.currentUser.photoURL,
      })
    );
    // await axios.post("/payment/userEmail", auth.currentUser);

    return responseFirebase.user;
  } catch (error) {
    handleErrorLoginAndRegister(error);
    await signOut(auth);
  }
};
