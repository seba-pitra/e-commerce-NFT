const { Router } = require ("express");
const { sendMail } = require ("../controllers/fungiblemail.controller.js");


const userRouter = Router();

userRouter.post("/", sendMail);



module.exports = userRouter;


