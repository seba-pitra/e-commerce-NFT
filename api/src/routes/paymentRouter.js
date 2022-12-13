
const express = require("express");
const paymentRouter = express.Router();

const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

paymentRouter.get("/", function (req, res, next) {
  return res.json({
    "/payment": "generates a payment link",
    "/subscription": "generates a subscription link"
  });
});

paymentRouter.get("/payment", function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});

paymentRouter.get("/subscription", function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});

module.exports = paymentRouter;
