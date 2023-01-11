const { Review, User, Nft, Collection } = require("../db");
const helpers = require('./contoller.helper.functions/averageStarsCalculator.js')

//Create a new review
const createReview = async (req, res) => {
  try {
    // Obtener los datos de la revisión de la solicitud
    const { userId, nftId, collectionId, value } = req.body;
    // Verificar que se hayan proporcionado todos los datos necesarios para la revisión
    if (!userId || (!nftId && !collectionId) || !value) {
      throw new Error(`Insufficient data for review received: ${req.body}`);
    }

    // Obtener el usuario asociado a la revisión
    const user = await User.findByPk(userId);
    // Verificar que el usuario exista
    if (!user) throw new Error(`Invalid id for user: ${userId}`);

    // Buscar o crear una revisión con los datos especificados
    const [review, created] = await Review.findOrCreate({
      // Buscar una revisión con el mismo ID de usuario y NFT
      where: { userId, nftId },
      // Valores por defecto para la revisión en caso de que no exista previamente
      defaults: { value },
    });

    // Si la revisión ya existía, actualizar su valor
    if (!created) {
      review.value = value;
      await review.save();
    }

    // Establecer la relación entre el usuario y la revisión
    review.setUser(user);

    // Si se proporcionó un ID de NFT, establecer la relación entre la revisión y el NFT
    if (nftId) {
      const reviewedNft = await Nft.findByPk(nftId);
      await review.setNft(reviewedNft);
      if(review.nftId){
        await helpers.calculateNftStars(review.nftId)
      }
    }
    // Si se proporcionó un ID de colección, establecer la relación entre la revisión y la colección
    if (collectionId) {
      const reviewedCollection = await Collection.findByPk(collectionId);
      await review.setCollection(reviewedCollection);
    }

    // Obtener la revisión con los modelos asociados incluidos en la consulta
    const reviewWithAssociatedData = await Review.findByPk(review.id, {
      include: [{ model: User }, { model: Nft }, { model: Collection }],
    });

    // Enviar la revisión con los modelos asociados en la respuesta
    return res.status(200).json({
      createdReview: reviewWithAssociatedData,
      averageStars : reviewWithAssociatedData.nft.stars
    });
  } catch (error) {
    // En caso de error, enviar el mensaje de error en la respuesta
    return res.status(400).json({
      message: error.message,
      error_detail: error,
    });
  }
};

//Get a review through id
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
    console.error(error.message);
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
    console.error(error);
    res.status(404).json({ error: error.message });
  }
};

// Get a list of all purchases.
// Conseguir el listado de todas las compras.
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
