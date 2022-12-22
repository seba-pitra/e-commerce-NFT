const { Router } = require("express");
const {
  createNewBuy,
  getAllBuy,
  getBuyById,
} = require("../controllers/buy.controller");

const buyRouter = Router();

buyRouter.post("/", createNewBuy)

buyRouter.get("/", getAllBuy)

buyRouter.get("/:id", getBuyById)

module.exports = buyRouter;