const { Collection, Nft, User, Review } = require("../db");


// Get all collections from the database.
// Conseguir todas las colecciones de la base de datos.
const getCollections = async (req, res) => {
  try {
    const allCollections = await Collection.findAll({
            include: [{ model: User }, { model: Nft }, { model: Review }],
            paranoid: req.query.deleted === "include" ? false : true
          })
    if (allCollections.length === 0) throw new Error("Collections empty");
    return res.status(200).json(allCollections);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      error_detail: error
    });
  }
};

const getCollectionsFromUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const ownedCollections = await Collection.findAll({
      where: { userId : userId },
      include: [{ model: User }, { model: Nft }, { model: Review }],
      paranoid: req.query.deleted === "include" ? false : true
    })
    return res.status(200).json(ownedCollections);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      error_detail: error
    });
  }
}

const getCollectionsCount = async (req, res) => {
  try {
    const userId = req.query.fromUser;
    let options;
    if (userId) options.where = { userId : userId };
    const quantity = await Collection.count({});
    res.status(200).json({ collectionQuantity: quantity });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      error_detail: error
    });
  }
}

//Get a collection through id from the database.
//Conseguir una colleccion de la base de datos usando el id.
const getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundCollectionInDB = await Collection.findByPk(id, {
      include: [{ model: Nft},{ model: User },{ model: Review }],
    });
    if (foundCollectionInDB) {
      res.status(200).json(foundCollectionInDB);
    } else {
      throw new Error(`Could not find collection in db with id ${id}`);
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error_detail: err
    });
  }
};

//Crear una nueva colleccion a partir de el id, el nombre y una imagen.
//**(Es necesario revisar, el id de las collections de la api tiene un formato especifico)**
const createNewCollection = async (req, res) => {
  try {
    const { name, image, userId } = req.body; //recibe nombre, url de imagen y usuario.
    if (!name || !userId) {
      throw new Error({
        message: `insufficient parameters for creating collection`,
        name : name,
        image : image,
        userId : userId,
      });
    } else {
      const userOwner = await User.findByPk(userId); // busca usuario en la db
      const newCollection = await Collection.create({
        name: name,
        image: image,
        origin: "USER",
        contract: userOwner.metamask_wallet,
      }); // Crea la coleccion con los datos recibidos

      newCollection.setUser(userOwner); //setea el usuario como dueño de la db.

      res.status(200).json(newCollection); //devuelve la coleccion creada.
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error_detail: err
    });
  }
};

//Borrar coleccion de la base de datos a partir de id. (Soft-delete)
const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCollection = await Collection.findByPk(id);

    if (deletedCollection) {
      await Collection.destroy({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .send(`${deletedCollection.name} deleted successfully`);
    } else {
      throw new Error(`no Collection found with id: ${id}`);
    }
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

//Actualizar los datos de una collecion a partir de el id.
const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const foundCollection = await Collection.findByPk(id);
    if (foundCollection) {
      foundCollection.set(dataToUpdate);
      await foundCollection.save();
      return res.status(200).send(foundCollection);
    } else {
      throw new Error(`No collection with id ${id}`);
    }
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};
//Restaurar una colleccion eliminada.
const restoreDeletedCollection = async (req, res) => {
  try {
    const { id } = req.params;
    await Collection.restore({
      where: {
        id: id,
      },
    });
    const restoredCollection = await Collection.findByPk(id);

    if (restoredCollection) {
      return res.status(200).json({
        nft: restoredCollection,
        message: `${restoredCollection.name} successfully restored`,
      });
    } else {
      throw new Error(`No collection found with id ${id}`);
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err: err.message });
  }
};

module.exports = {
  getCollections,
  getCollectionById,
  createNewCollection,
  deleteCollection,
  updateCollection,
  restoreDeletedCollection,
};
