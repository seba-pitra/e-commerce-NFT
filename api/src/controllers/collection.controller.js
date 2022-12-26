// const { reauthenticateWithCredential } = require("firebase/auth");
const { Collection, Nft } = require("../db");
const { collections } = require("../jsondata/collections.json")

const getCollections = async (req, res) => {
  try{
    const dbCollections = await Collection.findAll({
      include : {
        model : Nft
      }
    });
    if(dbCollections.length === 0){
      throw new Error("nothing on database please contact Mr. Miguel Villa");
    }
    return res.status(200).json(dbCollections);
  }catch(err){
    return res.status(400).json({error : err.message});
  }
};
const getCollectionById = async (req, res) => {
  try{
    const { id } = req.params;
    const foundCollectionInDB = await Collection.findByPk(id,
      {
        include : {
          model : Nft
        }
      }
      );
    if(foundCollectionInDB){
      res.status(200).json(foundCollectionInDB);
    }else{
      throw new Error(`Could not find collection in db with id ${id}`);
    }
  }catch(err){
    res.status(400).json({error : err.message})
  }
};
const createNewCollection = async (req, res) => {
  try{
    const {
      id,
      name,
      image
    } = req.body;
    if(!id || !name){
      throw new Error(`insufficient parameters for creating collection`)
    }else{
      const newCollection = await Collection.create({
        id: id,
        name: name,
        image: image
      })
      res.status(200).json(newCollection)
    }
  }catch(err){
    res.status(400).json({error : err.message})
  }
}
const deleteCollection = async (req, res) => {
  try{
    const { id } = req.params;
    const deletedCollection = await Collection.findByPk({
      where : {
        id: id,
      }
    })
    if(deletedCollection){
      await Collection.destroy({
        where : {
          id: id,
        }
      });
      return res.status(200).send(`${deletedCollection.name} deleted successfully`)
    }else{
      throw new Error(`no Collection found with id: ${id}`)
    }
  }catch(err){
    return res.status(400).json({err : err.message})
  }
}

const updateCollection = async (req, res) => {
  try{
    const { id } = req.params;
    const dataToUpdate = req.body;
    const foundCollection = await Collection.findByPk(id);
    if(foundCollection){
      foundCollection.set(dataToUpdate);
      await foundCollection.save();
      return res.status(200).send(foundCollection);
    }else{
      throw new Error(`No collection with id ${id}`);
    }
  }catch(err){
    res.status(400).send(err.message);
  }
}

const restoreDeletedCollection = async (req, res) => {
  try {
    const { id } = req.params;
    await Collection.restore({
      where : {
        id : id,
      }
    })
    const restoredCollection = await Collection.findByPk({
      where : {
        id : id,
      }
    })

    if(restoredCollection){
      return res.status(200).json({
        nft : restoredCollection,
        message : `${restoredCollection.name} successfully restored`
      });
    }else{
      throw new Error(`No collection found with id ${id}`)
    }
  }catch(err){
    return res.status(400).json({err : err.message})
  }
}
/*
  controllers to create and post collections to db
*/

const postAllCollectionsToDB = async (req, res) => {
  try{
    const allCollections = createAllInitialCollections();
    res.status(200).json(allCollections);
  }catch(err){
    res.status(400).json({error : err.message});
  }
}

const createAllInitialCollections = async () => {
  try{
    const response = await Collection.findAll();
    if(response.length === 0){
      collections.forEach(async collection => {
        let collectionToDB = {
          id : collection.id,
          name : collection.name || "No name",
          image : collection.image || "No image"
        };
        const collectionInDB = await Collection.create(collectionToDB)
        response.push(collectionInDB);
      })
    }
      return response;
  }catch(err) {
    throw new Error(err.message);
  }
}


module.exports = {
  getCollections,
  getCollectionById,
  createNewCollection,
  deleteCollection,
  updateCollection,
  restoreDeletedCollection,
  postAllCollectionsToDB,
  createAllInitialCollections
};
