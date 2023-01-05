const { Router } = require("express");
const {
  createNewPurchase,
  getAllPurchases,
  getPurchaseById,
} = require("../controllers/purchase.controller");

const purchaseRouter = Router();

purchaseRouter.post("/", createNewPurchase)

purchaseRouter.get("/", getAllPurchases)

purchaseRouter.get("/:id", getPurchaseById)

module.exports = purchaseRouter;