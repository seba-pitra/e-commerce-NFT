const allNFTs = require("../jsondata");
const { Nft, Collection, User } = require("../db");

const { superUser } = require("../jsondata/superUserData.json");

const superUserId = superUser.id;
// Devuelve todos los nfts de la base da datos junto con su coleccion asignada.
const getNfts = async (req, res) => {
  try {
    const dbNfts = await Nft.findAll({
      include: {
        model: Collection,
      },
    });
    if (dbNfts.length === 0) {
      throw new Error("nothing on database please contact Mr. Miguel Villa");
    }
    res.status(200).send(dbNfts);
  } catch (err) {
    res.status(404).send(err.message);
  }
};
// Devuelve el nft que busca mediante id.
const getNftById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundNftFromDB = await Nft.findByPk(id);
    if (foundNftFromDB) {
      res.status(200).json(foundNftFromDB);
    } else {
      throw new Error(`No nft with id ${id}`);
    }
  } catch (err) {
    res.status(400).send(err.message);
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
    res.status(400).send(err.message);
  }
};
//Crea el nuevo nft a partir de nombre, descripcion, imagen, contrato, id del token, precio, dueño e imagen.
const createNewNFT = async (req, res) => {
  console.log(req.body)
  try {
    const {
      collection,
      name,
      description,
      image,
      price,
      categories,
      contract,
      ownerName,
      ownerIcon,
    } = req.body;
    if (!name || !image || !price || !collection || !categories) {
      throw new Error(`Insufficient data provided`);
    }

    const newNFT = await Nft.create({
      name: name,
      description: description || "No description",
      image: image || "No image",
      contract: contract || "No idea",
      category: categories || ["Other", "Other", "Other", "Other", "Other", "Normal", "Other"],
      tokenId: "1",
      price: parseInt(price),
      rarity: Math.floor(Math.random() * 20000 + 9000),
      rarityRank: Math.floor(Math.random() * 30000 + 1),
      lastBuyValue: 0.01,
      lastBuyTs: Date.now(),
      ownerName: ownerName || "OpenSea",
      ownerIcon: ownerIcon || "https://raw.githubusercontent.com/reservoirprotocol/indexer/v5/src/models/sources/opensea-logo.svg",
      available: true,
    });

    if (contract) {
      const correspondingCollection = await Collection.findByPk({
        where: {
          id: contract,
        },
      });
      if (correspondingCollection) {
        await newNFT.setCollection(correspondingCollection);
      } else {
        throw new Error(`No collection found with id  ${contract}`);
      }
    }

    res.status(200).json(newNFT);
  } catch (err) {
    res.status(400).send(err.message);
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

const createAllInitialNFTs = async () => {
  try {
    let response = await Nft.findAll({});
    const superUser = await User.findOne({
      where: {
        id: superUserId
      }
    })
    if(response.length === 0){
      console.log("Starting NFTs creation database." + new Date().toString())
      for(const nft of allNFTs){
        let count = 0;
        let nftName = nft.token.name || nft.token.collection.name + " #" + nft.token.tokenId

        nftName =
          nftName.charAt(0) === "#"
            ? nft.token.collection.name + " " + nftName
            : nftName;
        nftName = nftName.includes("#")
          ? nftName
          : nftName + " #" + nft.token.tokenId;

        let priceLastBuy = 0;
        if (nft.token.lastSell.value === null) {
          priceLastBuy =
            nft.market.floorAsk.price.amount.decimal -
            nft.market.floorAsk.price.amount.decimal * 0.1;
        } else priceLastBuy = nft.token.lastSell.value;

        let nftToDB = {
          name: nftName,
          description: nft.token.description || "No description",
          image: nft.token.image || "No image",
          contract: nft.token.contract,
          category: nft.token.category || ["Other"],
          tokenId: nft.token.tokenId,
          price: nft.market.floorAsk.price.amount.decimal,
          rarity:
            Math.floor(nft.token.rarity) ||
            Math.floor(Math.random() * 20000 + 9000),
          rarityRank:
            nft.token.rarityRank || Math.floor(Math.random() * 30000 + 1),
          lastBuyValue: priceLastBuy.toFixed(2),
          lastBuyTs:
            nft.token.lastBuy.timestamp ||
            Math.floor(Math.random() * 40000000 + 1631509481),
          ownerName: nft.market.floorAsk.source.name || "OpenSea",
          ownerIcon:
            nft.market.floorAsk.source.icon ||
            "https://raw.githubusercontent.com/reservoirprotocol/indexer/v5/src/models/sources/opensea-logo.svg",
        };

        const nftInDb = await Nft.create(nftToDB);
        const correspondingCollection = await Collection.findOne({
          where: {
            id: nft.token.collection.id,
          },
        });

        await nftInDb.setCollection(correspondingCollection);
        await nftInDb.setUser(superUser);
        response.push(nftInDb);
        count++;
        if (count === 100) {
          console.log(response.length);
          count = 0;
        }
      }
    } else {
      throw new Error(
        "Database contains data, if you are trying to reset, please erase previous contents with force: true"
      );
    }
    console.log(
      "NFT Creation SUCCESS " +
        response.length +
        " NFTS on DB" +
        new Date().toString()
    );
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createNftQuantityByChoice = async (nftQuantity) => {
  try {
    const nfts = allNFTs.slice(0, nftQuantity);
    let response = await Nft.findAll({});
    const superUser = await User.findOne({
      where: {
        id: superUserId,
      },
    });
    if (response.length === 0) {
      console.log("Starting NFTs creation database. " + new Date().toString());
      for (const nft of nfts) {
        let nftName =
          nft.token.name ||
          nft.token.collection.name + " #" + nft.token.tokenId;

        nftName =
          nftName.charAt(0) === "#"
            ? nft.token.collection.name + " " + nftName
            : nftName;
        nftName = nftName.includes("#")
          ? nftName
          : nftName + " #" + nft.token.tokenId;

        let priceLastBuy = 0;
        if (nft.token.lastSell.value === null) {
          priceLastBuy =
            nft.market.floorAsk.price.amount.decimal -
            nft.market.floorAsk.price.amount.decimal * 0.1;
        } else priceLastBuy = nft.token.lastSell.value;

        let nftToDB = {
          name: nftName,
          description: nft.token.description || "No description",
          image: nft.token.image || "No image",
          contract: nft.token.contract,
          category: nft.token.category || ["Other"],
          tokenId: nft.token.tokenId,
          price: nft.market.floorAsk.price.amount.decimal,
          rarity:
            Math.floor(nft.token.rarity) ||
            Math.floor(Math.random() * 20000 + 9000),
          rarityRank:
            nft.token.rarityRank || Math.floor(Math.random() * 30000 + 1),
          lastBuyValue: priceLastBuy.toFixed(2),
          lastBuyTs:
            nft.token.lastBuy.timestamp ||
            Math.floor(Math.random() * 40000000 + 1631509481),
          ownerName: nft.market.floorAsk.source.name || "OpenSea",
          ownerIcon:
            nft.market.floorAsk.source.icon ||
            "https://raw.githubusercontent.com/reservoirprotocol/indexer/v5/src/models/sources/opensea-logo.svg",
        };

        const nftInDb = await Nft.create(nftToDB);
        const correspondingCollection = await Collection.findOne({
          where: {
            id: nft.token.collection.id,
          },
        });

        await nftInDb.setCollection(correspondingCollection);
        await nftInDb.setUser(superUser);
        response.push(nftInDb);
        console.log(
          "---------------------------\n" +
            "NFT n°" +
            response.length +
            " \n" +
            "Name: " +
            nftInDb.name +
            " \n" +
            "Created at: " +
            new Date().toString() +
            " \n" +
            "---------------------------"
        );
      }
    }
    console.log(
      "NFT Creation SUCCESS " +
        response.length +
        " NFTS on DB " +
        new Date().toString()
    );
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getNfts,
  getNftById,
  createAllInitialNFTs,
  updateNft,
  createNewNFT,
  deleteNft,
  restoreDeletedNft,
  createNftQuantityByChoice
};
