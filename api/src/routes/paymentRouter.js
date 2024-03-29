const express = require("express");
const paymentRouter = express.Router();
const PaymentController = require("../controllers/PaymentController");
const { PaymentService, setUserEmailForPaymentService } = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

paymentRouter.post("/", async (req, res, next) => {
  try {
    await PaymentInstance.getPaymentLink(req, res);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

paymentRouter.post("/userEmail", async (req, res) => {
  setUserEmailForPaymentService(req.body);
  return res.sendStatus(201);
});

paymentRouter.get("/subscription", function (req, res) {
  PaymentInstance.getSubscriptionLink(req, res);
});

module.exports = paymentRouter;
