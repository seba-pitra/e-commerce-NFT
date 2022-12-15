const axios = require("axios");
require("dotenv").config();
const { validateUser } = require("../firebase");

class PaymentService {
  async createPayment(nftBody) {
    //NFT's y el email del user que va a comprar
    const url = "https://api.mercadopago.com/checkout/preferences";

    const user = validateUser();

    // console.log("USER", user.providerData[0].email);

    const body = {
      payer_email: user.providerData[0].email,
      items: nftBody.map((nft) => {
        const price = Math.floor(nft.price * 1271);

        return {
          title: nft.name,
          description: "NFT descriptcion",
          picture_url: nft.image,
          category_id: nft.tokenId,
          quantity: 1,
          unit_price: price,
        };
      }),

      back_urls: {
        //Create pages result
        failure: "http://localhost:3000/marketplace",
        pending: "/pending",
        success: "/success",
      },
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS",
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_46945293@testuser.com",
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
