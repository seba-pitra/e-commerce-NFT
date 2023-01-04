const { Review, User, Nft, Collection } = require("../db");

//Create a new review
const createReview = async (req, res) => {
    try {
        const {
            userId,
            nftId,
            collectionId,
            value,
        } = req.body;

        if(!userId || (!nftId || !collectionId) || !value) {
            throw new Error(
                `Insufficient data for review
                received: ${req.body}`
            );
        }
        const review = await Review.create({
            value: value,
        })
        const user = await User.findByPk(userId);
        if (!user) throw new Error(`Invalid id for user: ${userId}`);
        if(nftId) {
            const reviewedNft = await Nft.findByPk(nftId);
            await review.setNft(reviewedNft)
        }
        if(collectionId) {
            const reviewedCollection = await Collection.findByPk(collectionId);
            await review.setCollection(reviewedCollection)
        }
    } catch (error) {
        return res.status(400).json({error : error.message})
    }
};

//Get a review through id
const getReviewByID = async (req, res) => {
    try {
        const { reviewId } = req.params
    } catch (error) {
        
    }
};

// Get a list of all purchases.
// Conseguir el listado de todas las compras.
const getAllReviews = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

const updateReview = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

const deleteReview = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};



module.exports = {
    createReview,
    getAllReviews,
    getReviewByID,
    updateReview,
    deleteReview,
};
