const allNFTs = require("../jsondata");
const testNFTs = require("../jsondata/indexTest")

const { Nft, Collection, User } = require("../db");

const { superUser } = require("../jsondata/superUserData.json");

const utils = require("../utils")

const superUserId = superUser.id;
// Devuelve todos los nfts de la base da datos junto con su coleccion asignada.
const getNfts = async (req, res) => {
  try {
    const dbNfts = await Nft.findAll({
      include: [
        {
          model: Collection,
        },
        {
          model: User,
        },
        {
          model: Review,
        }
      ],
    });
    if (dbNfts.length === 0) {
      throw new Error("nothing on database please contact Mr. Miguel Villa");
    }
    res.status(200).send(dbNfts);
  } catch (err) {
    res.status(404).json({error: err.message});
  }
};
// Devuelve el nft que busca mediante id.
const getNftById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundNftFromDB = await Nft.findByPk(id, {
      include: [
        {
          model: Collection,
        },
        {
          model: User,
        },
        {
          model: Review,
        }
      ],
    });
    if (foundNftFromDB) {
      res.status(200).json(foundNftFromDB);
    } else {
      throw new Error(`No nft with id ${id}`);
    }
  } catch (err) {
    res.status(404).json({error: err.message});
  }
};

//Actualiza el nft que busca mediante id.
const updateNft = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const foundNft = await Nft.findByPk(id);
    if (foundNft) {
      foundNft.set(dataToUpdate);
      await foundNft.save();
      return res.status(200).send(foundNft);
    } else {
      throw new Error(`No nft with id ${id}`);
    }
  } catch (err) {
    res.status(404).json({error: err.message});
  }
};
//Crea el nuevo nft a partir de nombre, descripcion, imagen, contrato, id del token, precio, dueño e imagen.
const createNewNFT = async (req, res) => {
  try {
    const {
      userId,
      collectionId,
      name,
      description,
      image,
      price,
      categories,
    } = req.body;
    // recibe usuario, coleccion mediante id. nombre, descripcion, imagen en url, precio y lista de categorias.
    if (!userId || !name || !image || !price || !collectionId || !categories) {
      throw new Error(
        `Insufficient data provided
        received userId: ${userId}
        received name: ${name}
        received image: ${image}
        received price: ${price}
        received collectionId: ${collectionId}
        received categories: ${categories}`
      );
    }else{
      //se busca el usuario
      const userOwner = await User.findByPk(userId);
      //buscamos collecion correspondiente y la devolvemos con los nfts que contiene.
      const correspondingCollection = await Collection.findByPk(collectionId, {
        include : {
          model : Nft
        }
      });
      //si encuentra la coleccion crea el nuevo nft
      if (correspondingCollection) {
      const tokenId = "#" + (correspondingCollection.nfts.length + 1); // el token id esta relacionado al numero de nfts que ya tiene la coleccion.
      const nftName = name + " #" + tokenId; // agregamos el tokenId al name.

      const newNFT = await Nft.create({
        name: nftName,
        description: description || "No description",
        image: image || "No image",
        contract: correspondingCollection.contract || "No available contract",
        category: categories || [
          "Other",
          "Other",
          "Other",
          "Other",
          "Other",
          "Normal",
          "Other",
        ],
        tokenId: tokenId,
        price: price,
        rarity: Math.floor(Math.random() * 20000 + 9000),
        favs: 0,
        stars: 0,
        lastBuyValue: null, // null ?
        lastBuyTs: null, // null ?
        createdTs: Date.now(),
        ownerName: userOwner.name || "Non Fungible Town",
        ownerIcon: userOwner.profile_pic || "https://raw.githubusercontent.com/seba-pitra/e-commerce-NFT/main/client/src/images/logo/logo.png"
      });

        //si la encuentra la relaciona al nuevo nft.
        await newNFT.setCollection(correspondingCollection);
        await newNFT.setUser(userOwner);
        res.status(200).json(newNFT);

      } else {
        throw new Error(`No collection found with id  ${collectionId}`);
      }
    }
    } catch (err) {
      res.status(400).json({error : err.message});
    }
};

// Borra el nft de la base de datos (Soft-delete)
const deleteNft = async (req, res) => {
    try {
    const { id } = req.params;
    const deletedNFT = await Nft.findByPk({
      where: {
        id: id,
      },
    });
    if (deletedNFT) {
      await Nft.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).send(`${deletedNFT.name}  successfully deleted`);
    } else {
      throw new Error(`no NFT found with id: ${id}`);
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//Restaura el nft borrado previamente.
const restoreDeletedNft = async (req, res) => {
  try {
    const { id } = req.params;
    await Nft.restore({
      where: {
        id: id,
      },
    });
    const restoredNft = await Nft.findByPk({
      where: {
        id: id,
      },
    });
    if (restoredNft) {
      return res.status(200).json({
        nft: restoredNft,
        message: `${restoredNft.name} successfully restored`,
      });
    } else {
      throw new Error(`No nft found with id ${id}`);
    }
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

/*
 * function to add all nfts to the database using jsons as the base data.
 */

const createInitialNFTs = async (req) => {
  try {
    let allCreatedNfts = await Nft.findAll({});

      if (allCreatedNfts.length === 0) {
        let nfts = req.query.test === "true" ? testNFTs : allNFTs;
        let { nftQuantity } = req.params
        if (!nftQuantity){
            nftQuantity = nfts.length
        }else{
            nftQuantity = parseInt(nftQuantity)
        }
        if(nftQuantity > nfts.length){
            throw new Error("Number should be equal or less than" + nfts.length);
        }
      console.log("Starting NFTs creation database. " + new Date().toString());

      nfts = nfts.slice(0, nftQuantity);

      allCreatedNfts = await nftCreator(nfts, allCreatedNfts)
      
      } else {
        throw new Error("Database already contains data.");
      }
      console.log(
        "NFT Creation SUCCESS " +
        allCreatedNfts.length +
          " NFTS on DB " +
          new Date().toString()
      );
    return allCreatedNfts;
  } catch (err) {
    console.error(err.message);
    throw new Error(`Function: createAllInitialNFTs() caught error: ${err.message}`);
  }
};

// Function that creates nfts bases on data on json files.
const nftCreator = async (nftsToCreate, responseArray) => {
  
  const superUser = await User.findOne({
    where: {
      id: superUserId,
    },
  });
  for (const nft of nftsToCreate) {
    //se diseña el name en base a los datos.
    let nftName =  utils.nftNameCreatorFor(nft)
    //se calcula el precio de la ultima compra
    let priceLastBuy = utils.priceLastBuyCalculatorFor(nft);
    //se genera el objeto para inyectar en la base de datos.
    let nftToDb = utils.nftObjectCreatorFrom(nft, nftName, priceLastBuy);
    const nftInDb = await Nft.create(nftToDb);

    const correspondingCollection = await Collection.findOne({
      where: {
        contract: nft.token.collection.id,
      },
    });

    await nftInDb.setCollection(correspondingCollection);
    await nftInDb.setUser(superUser);
    responseArray.push(nftInDb);

    console.log(
      "---------------------------\n" +
        "NFT n°" +
        responseArray.length +
        " \n" +
        "Name: " +
        nftInDb.name +
        " \n" +
        "Created at: " +
        new Date().toString() +
        " \n" +
        "Collection: " +
        correspondingCollection.name +
        " \n" +
        "User: " +
        superUser.name +
        " \n" +
        "---------------------------"
    );
  }

  return responseArray;
}

module.exports = {
  getNfts,
  getNftById,
  createInitialNFTs,
  updateNft,
  createNewNFT,
  deleteNft,
  restoreDeletedNft,
};
