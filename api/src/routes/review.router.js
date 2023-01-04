const { Router } = require ("express");
const {
    getAllReviews,
    getReviewByID,
    createReview,
    updateReview,
    deleteReview
} = require ("../controllers/review.controller.js");


const reviewRouter = Router();

reviewRouter.get("/", getAllReviews);

reviewRouter.get("/:id", getReviewByID);

reviewRouter.post("/create", createReview);

reviewRouter.put("/update/:id", updateReview);

reviewRouter.delete("/delete/:id", deleteReview);

module.exports = userRouter;


