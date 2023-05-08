const { Review, User, Nft, Collection } = require("../db");
const helpers = require('./contoller.helper.functions/averageStarsCalculator.js')

const createReview = async (req, res) => {
  try {
    const { userId, nftId, collectionId, value } = req.body;

    if (!userId || (!nftId && !collectionId) || !value) {
      throw new Error(`Insufficient data for review received: ${req.body}`);
    }

    const user = await User.findByPk(userId);

    if (!user) throw new Error(`Invalid id for user: ${userId}`);

    const [review, created] = await Review.findOrCreate({
      where: { userId, nftId },
      defaults: { value },
    });

    if (!created) {
      review.value = value;
      await review.save();
    }

    review.setUser(user);

    if (nftId) {
      const reviewedNft = await Nft.findByPk(nftId);
      await review.setNft(reviewedNft);
      if(review.nftId){
        await helpers.calculateNftStars(review.nftId)
      }
    }
    if (collectionId) {
      const reviewedCollection = await Collection.findByPk(collectionId);
      await review.setCollection(reviewedCollection);
    }

    const reviewWithAssociatedData = await Review.findByPk(review.id, {
      include: [{ model: User }, { model: Nft }, { model: Collection }],
    });

    return res.status(200).json({
      createdReview: reviewWithAssociatedData,
      averageStars : reviewWithAssociatedData.nft.stars
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      error_detail: error,
    });
  }
};

const getReviewByID = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id, {
      include: [
        {
          model: User,
        },
        {
          model: Collection,
        },
        {
          model: Nft,
        },
      ],
      paranoid: req.query.deleted === "include" ? false : true
    });
    if (!review) throw new Error(`No review found with id : ${id}`);
    return res.status(200).json({ review: review });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getReviewsFromUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: [
        {
          model: Review,
        },
      ],
    });

    if (!user) throw new Error(`No user found with id: ${id}`);

    res.status(200).json({ user_reviews: user.reviews });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const allReviews =
      req.query.deleted === "include"
        ? await Review.findAll({
            include: [{ model: Nft }, { model: Collection }, { model: User }],
            paranoid: false,
          })
        : await Review.findAll({
            include: [{ model: Nft }, { model: Collection }, { model: User }],
          });
    res.status(200).json(allReviews);
  } catch (error) {
    res.status(404).json({ error: error.message });
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
    res.status(400).json({ error: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const reviewToDelete = await Review.findByPk(id);

    if (reviewToDelete) {
      await Review.destroy({
        where: { id: id },
      });
      res.status(200).json({ message: "review succesfully deleted" });
    } else {
      throw new Error(`No review found with id : ${id}`);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewByID,
  updateReview,
  deleteReview,
  getReviewsFromUser,
};
