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
        const newReview = await Review.create({
            value: value,
        })
        const user = await User.findByPk(userId);
        if (!user) throw new Error(`Invalid id for user: ${userId}`);

        newReview.setUser(user)

        if(nftId) {
            const reviewedNft = await Nft.findByPk(nftId);
            await newReview.setNft(reviewedNft)
        }
        if(collectionId) {
            const reviewedCollection = await Collection.findByPk(collectionId);
            await newReview.setCollection(reviewedCollection)
        }

        const newReviewWithAssociatedData = await Review.findByPk(newReview.id);

        return res.status(200).json({createdReview : newReviewWithAssociatedData})
    } catch (error) {
        return res.status(400).json({error : error.message})
    }
};

//Get a review through id
const getReviewByID = async (req, res) => {
    try {
        const { id } = req.params
        const review = await Review.findByPk(id, {
            include : [{
                model : User
            },{
                model : Collection
            },{
                model : Nft
            }]
        });
        if (!review) throw new Error(`No review found with id : ${id}`)
        return res.status(200).json({review : review})
    } catch (error) {
        console.error(error.message);
        return res.status(404).json({error : error.message})
    }
};

const getReviewsFromUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findByPk(id, {
            include : [{
                model : Review
                }]
            });

        if (!user) throw new Error(`No user found with id: ${id}`)

        res.status(200).json({user_reviews : user.reviews})
        
    } catch (error) {
        console.error(error);
        res.status(404).json({error : error.message})
    }
}

// Get a list of all purchases.
// Conseguir el listado de todas las compras.
const getAllReviews = async (req, res) => {
    try {
        const allReviews = req.query.deleted === "include" ? 
        await Review.findAll({
            include: [{ model: Nft }, { model: Collection }, { model: User }],
            paranoid : false,
        }) :
        await Review.findAll({
            include: [{ model: Nft }, { model: Collection }, { model: User }],
        })
        res.status(200).json(allReviews)
    } catch (error) {
        console.error(error);
        res.status(404).json({error: error.message})
    }
};

const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const dataToUpdate = req.body;
        const foundReview = await Review.findByPk(id);
        if (foundReview) {
            foundReview.set(dataToUpdate);
            await foundReview.save();
            return res.status(200).send(foundReview);
        } else {
            throw new Error(`No user with id ${id}`);
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({error: err.message});
    }
};

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const reviewToDelete = await Review.findByPk(id);
        if (reviewToDelete){
            await Review.destroy({
                where : { id : id }
            });
            res.status(200).json({message : "review succesfully deleted"})
        }else{
            throw new Error(`No review found with id : ${id}`)
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    createReview,
    getAllReviews,
    getReviewByID,
    updateReview,
    deleteReview,
    getReviewsFromUser
};
