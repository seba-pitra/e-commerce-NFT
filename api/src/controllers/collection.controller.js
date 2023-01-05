const { Collection, Nft, User, Review } = require("../db");
const { collections } = require("../jsondata/collections.json");

const { superUser } = require("../jsondata/superUserData.json");

const superUserId = superUser.id;

// Get all collections from the database.
// Conseguir todas las colecciones de la base de datos.
const getCollections = async (req, res) => {
  try {
    const allCollections =
      req.query.deleted === "include"
        ? await Collection.findAll({
            include: [{ model: User }, { model: Nft }, { model: Review }],
            paranoid: false,
          })
        : await Collection.findAll({
            include: [{ model: User }, { model: Nft }, { model: Review }],
          });
    if (allCollections.length === 0) {
      throw new Error("nothing on database");
    }
    return res.status(200).json(allCollections);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

//Get a collection through id from the database.
//Conseguir una colleccion de la base de datos usando el id.
const getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundCollectionInDB = await Collection.findByPk(id, {
      include: [
        {
          model: Nft,
        },
        {
          model: User,
        },
      ],
    });
    if (foundCollectionInDB) {
      res.status(200).json(foundCollectionInDB);
    } else {
      throw new Error(`Could not find collection in db with id ${id}`);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

//Crear una nueva colleccion a partir de el id, el nombre y una imagen.
//**(Es necesario revisar, el id de las collections de la api tiene un formato especifico)**
const createNewCollection = async (req, res) => {
  try {
    const { name, image, userId } = req.body; //recibe nombre, url de imagen y usuario.
    if (!name || !userId) {
      throw new Error(
        `insufficient parameters for creating collection
        received name ${name}
        received image ${image}
        received userId ${userId}
        `
      );
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
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

//Borrar coleccion de la base de datos a partir de id. (Soft-delete)
const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCollection = await Collection.findByPk({
      where: {
        id: id,
      },
    });
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
    console.error(err);
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
    const restoredCollection = await Collection.findByPk({
      where: {
        id: id,
      },
    });
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

/*
  controllers to create and post collections to db
*/
const postAllCollectionsToDB = async (req, res) => {
  try {
    const allCollections = createAllInitialCollections();
    res.status(200).json(allCollections);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const createAllInitialCollections = async () => {
  try {
    let response = await Collection.findAll({});
    const userOwner = await User.findOne({
      where: {
        id: superUserId,
      },
    });
    if (response.length === 0) {
      console.log("Starting collections creation " + new Date().toString());
      for (const collection of collections) {
        const collectionInDB = await Collection.create({
          contract: collection.id,
          name: collection.name || "No name",
          image: collection.image || "No image",
          origin: "API",
        });
        collectionInDB.setUser(userOwner);
        response.push(collectionInDB);
        console.log(
          "---------------------------\n" +
            "Collection n°" +
            response.length +
            " \n" +
            "Name: " +
            collectionInDB.name +
            " \n" +
            "Created at: " +
            new Date().toString() +
            " \n" +
            userOwner.name +
            " \n" +
            "---------------------------"
        );
      }
    }
    console.log(
      "Collection Creation SUCESSFUL" +
        response.length +
        " collections created " +
        "Date: " +
        new Date().toString()
    );
    return response;
  } catch (err) {
    console.log(err);
    throw new Error(
      `Function: createAllInitialCollections() caught => ${err.message}`
    );
  }
};

module.exports = {
  getCollections,
  getCollectionById,
  createNewCollection,
  deleteCollection,
  updateCollection,
  restoreDeletedCollection,
  postAllCollectionsToDB,
  createAllInitialCollections,
};
