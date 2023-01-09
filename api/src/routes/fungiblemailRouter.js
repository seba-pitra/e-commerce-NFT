const { Router } = require ("express");
const { sendMail } = require ("../controllers/fungiblemail.controller.js");

const emailRouter = Router();

emailRouter.post("/", sendMail);

module.exports = emailRouter;


