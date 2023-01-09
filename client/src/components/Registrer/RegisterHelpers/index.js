import { auth } from "../../../firebase.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import { handleErrorLoginAndRegister } from "../../../utils/index.js";

export const createUser = async (signUpData) => {
  try {
    if (signUpData.password !== signUpData.password2) {
      let err = { code: "Password do not match" };
      throw err;
    }

    await createUserWithEmailAndPassword(
      auth,
      signUpData.email,
      signUpData.password
    );

    const user = {
      id: auth.currentUser.uid,
      email: auth.currentUser.email,
      username: signUpData.username,
    };

    sendEmail();

    await signOut(auth);

    return user;
  } catch (error) {
    handleErrorLoginAndRegister(error);
  }
};

const sendEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      toast.success(
        "You have successfully registered. Please, check your email for verify",
        { position: "bottom-left", autoClose: false }
      );
    }).catch(err => {console.error(err);});
};