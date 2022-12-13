const { Router } = require("express");
const { app, auth, login, signUp, logOut, validateUser } = require("../firebase.js");

const firebaseRouter = Router();

// Login User
firebaseRouter.get("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginUp = await login(email, password);
    res.status(200).send(loginUp);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

firebaseRouter.get("/logOut", async (req, res) => {

  try {
    const test = await logOut();
    res.status(200).send(test);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

firebaseRouter.get("/userInfo", async (req, res)=>{
  try {
    const test = await validateUser();
    // const loggedUserID = await getLoggedUser()
    res.status(200).send(test)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

firebaseRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const sign = await signUp(email, password);
    res.status(200).send(sign);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = firebaseRouter;
