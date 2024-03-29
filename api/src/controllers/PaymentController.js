class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(req, res) {
    try {
      const payment = await this.subscriptionService.createPayment(req.body);

      return res.json(payment);
    } catch (error) {

      return res
        .status(500)
        .json({ error: true, msg: "Failed to create payment" });
    }
  }

  async getSubscriptionLink(req, res) {
    try {
      const subscription = await this.subscriptionService.createSubscription();

      return res.json(subscription);
    } catch (error) {

      return res.status(500).json({
        error: true,
        msg: "Failed to create subscription",
      });
    }
  }
}

module.exports = PaymentController;
