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

    // await axios.post("user/google/signin", user);

    // const userDb = await axios.get(`user/${user.id}`);

    // localStorage.setItem("currentUser", JSON.stringify(userDb));

    console.log("user", user);

    return user;
  } catch (error) {
    handleErrorLoginAndRegister(error);
  }
};

export const logginFunction = async (logginForm) => {
  try {
    const responseFirebase = await signInWithEmailAndPassword(
      auth,
      logginForm.email,
      logginForm.password
    );

    if (!responseFirebase.user.emailVerified) {
      let err = { code: "Email not verified" };
      throw err;
    }

    // await axios.post("/payment/userEmail", auth.currentUser);

    return responseFirebase.user;
  } catch (error) {
    handleErrorLoginAndRegister(error);
    await signOut(auth);
  }
};
