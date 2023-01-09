const { Router } = require ("express");
const reviewControllers = require ("../controllers/review.controller.js");

const reviewRouter = Router();

reviewRouter.get("/", reviewControllers.getAllReviews);

reviewRouter.post("/create", reviewControllers.createReview);

reviewRouter.get("/:id", reviewControllers.getReviewByID);

reviewRouter.get("/user/:id", reviewControllers.getReviewsFromUser);

reviewRouter.put("/:id", reviewControllers.updateReview);

reviewRouter.delete("/:id", reviewControllers.deleteReview);

module.exports = reviewRouter;