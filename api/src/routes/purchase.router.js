const { Router } = require("express");
const purchaseControllers = require("../controllers/purchase.controller");

const purchaseRouter = Router();

purchaseRouter.post("/create", purchaseControllers.createNewPurchase)

purchaseRouter.get("/", purchaseControllers.getAllPurchases)

purchaseRouter.get("/from-buyer/:id", purchaseControllers.getPurchasesByUserAsBuyer)

purchaseRouter.get("/from-seller/:id", purchaseControllers.getPurchasesByUserAsSeller)

purchaseRouter.put("/pending/:id", purchaseControllers.setPurchaseAsPending)

purchaseRouter.put("/reject/:id", purchaseControllers.rejectPurchase)

purchaseRouter.put("/approve/:id", purchaseControllers.purchaseSuccess)



module.exports = purchaseRouter;