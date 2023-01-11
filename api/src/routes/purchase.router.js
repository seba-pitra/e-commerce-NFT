const { Router } = require("express");
const purchaseControllers = require("../controllers/purchase.controller");

const purchaseRouter = Router();

purchaseRouter.post("/create", purchaseControllers.createNewTransaction)

purchaseRouter.get("/", purchaseControllers.getAllTransactions)

purchaseRouter.get("/from-buyer/:id", purchaseControllers.getTransactionsByUserAsBuyer)

purchaseRouter.get("/from-seller/:id", purchaseControllers.getTransactionsByUserAsSeller)

purchaseRouter.put("/pending/:id", purchaseControllers.setTransactionAsPending)

purchaseRouter.put("/reject/:id", purchaseControllers.rejectTransaction)

purchaseRouter.put("/approve/:id", purchaseControllers.purchaseSuccess)



module.exports = purchaseRouter;