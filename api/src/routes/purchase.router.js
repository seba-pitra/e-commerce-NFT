const { Router } = require("express");
const {
  createNewPurchase,
  getAllPurchases,
  getPurchasesByUserAsBuyer,
  getPurchasesByUserAsSeller,
  rejectPurchase,
  purchaseSuccess,
  setPurchaseAsPending
} = require("../controllers/purchase.controller");

const purchaseRouter = Router();

purchaseRouter.post("/", createNewPurchase)

purchaseRouter.get("/", getAllPurchases)

purchaseRouter.get("/from-buyer/:id", getPurchasesByUserAsBuyer)

purchaseRouter.get("/from-seller/:id", getPurchasesByUserAsSeller)

purchaseRouter.put("/pending/:id", setPurchaseAsPending)

purchaseRouter.put("/reject/:id", rejectPurchase)

purchaseRouter.put("/approve/:id", purchaseSuccess)



module.exports = purchaseRouter;