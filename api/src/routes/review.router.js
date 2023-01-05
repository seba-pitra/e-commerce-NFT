const { Router } = require ("express");
const {
    createReview,
    getAllReviews,
    getReviewByID,
    updateReview,
    deleteReview,
    getReviewsFromUser
} = require ("../controllers/review.controller.js");

const reviewRouter = Router();

reviewRouter.get("/", getAllReviews);

reviewRouter.post("/create", createReview);

reviewRouter.get("/:id", getReviewByID);

reviewRouter.get("/user/:id", getReviewsFromUser);

reviewRouter.put("/:id", updateReview);

reviewRouter.delete("/:id", deleteReview);

module.exports = reviewRouter;