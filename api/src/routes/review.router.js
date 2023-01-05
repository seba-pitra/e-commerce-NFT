const { Router } = require ("express");
const {
    getAllReviews,
    getReviewByID,
    createReview,
    updateReview,
    deleteReview,
    getReviewsFromUser
} = require ("../controllers/review.controller.js");

const reviewRouter = Router();

reviewRouter.get("/", getAllReviews);

reviewRouter.get("/:id", getReviewByID);

reviewRouter.get("/user/:id", getReviewsFromUser);

reviewRouter.post("/create", createReview);

reviewRouter.put("/:id", updateReview);

reviewRouter.delete("/:id", deleteReview);

module.exports = reviewRouter;