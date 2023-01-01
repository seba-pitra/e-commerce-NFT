const express = require("express");
const paymentRouter = express.Router();
const PaymentController = require("../controllers/PaymentController");
const {PaymentService, getLoggedUser} = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

paymentRouter.post("/", async (req, res, next) => {
  //pasar info por body: email del user a quien se le va a comprar el NFT y los NFT's a comprar
  //cambiar access token a produccion. Ahora esta con credenciales de prueba
  try {
    await PaymentInstance.getPaymentLink(req, res);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

paymentRouter.post("/userEmail", async (req, res)=> {
  // console.log(req.body)
  getLoggedUser(req.body)
})

paymentRouter.get("/subscription", function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});


module.exports = paymentRouter;
