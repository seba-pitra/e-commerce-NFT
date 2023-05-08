const { Nft, Collection, User, Review, Transaction } = require("../db");

const getNfts = async (req, res) => {
  try {
    const pageSize = req.query.pageSize
    const pageNumber = req.query.pageNumber
    const orderBy = req.query.orderBy
    const orderType = req.query.type

    let options = {
      include: [
        { model: User },
        { model: Collection },
        { model: Review },
        { model: Transaction },
      ],
    };

    if(orderBy && orderType) options.order = [[orderBy, orderType]]

    if(req.query.deleted === "include") options.paranoid = false

    if (pageSize && pageNumber) {
      options.limit = pageSize;
      options.offset = (pageNumber - 1) * pageSize
    }

    const allNfts = await Nft.findAll(options)

    if (allNfts.length === 0) throw new Error("No NFTs on database");

    res.status(200).send(allNfts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getNftQuantity = async (req, res) => {
  try {
    const column = req.query.column;
    const value = req.query.value;
    const paranoid = !(req.query.deleted === "include")
    let options = { paranoid: paranoid };
    if(column && value) options.where = { [column]: value };
    const nftQuantity = await Nft.count(options);
    res.status(200).json({ quantity : nftQuantity });
  }catch (error){
    res.status(400).json({error : error.message})
  }
}

const getNftById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundNftFromDB = await Nft.findByPk(id, {
      include: [{ model: Collection }, { model: User }, { model: Review }, { model: Transaction } ],
    });
    if (foundNftFromDB) res.status(200).json(foundNftFromDB);
    else throw new Error(`No nft with id ${id}`);
  } catch (err) {
    res.status(404).json({
      message: err.message,
      error_detail: err
    });
  }
};

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
    res.status(404).json({ error: err.message });
  }
};

const addViewsNft = async (req, res) => {
  try {
    const { id } = req.params;
    const foundNft = await Nft.findByPk(id);
    if (foundNft) {
      foundNft.set({ favs: foundNft.favs + 1 });
      await foundNft.save();
      return res.status(200).send(foundNft);
    } else {
      throw new Error(`No nft with id ${id}`);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

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
    } else {
      const userOwner = await User.findByPk(userId);
      const correspondingCollection = await Collection.findByPk(collectionId, {
        include: {
          model: Nft,
        },
      });
      if (correspondingCollection) {
        const tokenId = (correspondingCollection.nfts.length + 1); 
        const nftName = name + tokenId; 
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
          lastBuyValue: null,
          lastBuyTs: null,
          createdTs: Date.now(),
          ownerName: userOwner.username || "Non Fungible Town",
          ownerIcon:
            userOwner.profile_pic ||
            "https://raw.githubusercontent.com/seba-pitra/e-commerce-NFT/main/client/src/images/logo/logo.png",
        });

        await newNFT.setCollection(correspondingCollection);
        await newNFT.setUser(userOwner);
        res.status(200).json(newNFT);
      } else {
        throw new Error(`No collection found with id  ${collectionId}`);
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteNft = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNFT = await Nft.findByPk(id);
    if (deletedNFT) {
      await deletedNFT.destroy();
      return res.status(200).send(`${deletedNFT.name}  successfully deleted`);
    } else {
      throw new Error(`no NFT found with id: ${id}`);
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const restoreDeletedNft = async (req, res) => {
  try {
    const { id } = req.params;
    await Nft.restore({
      where: {
        id: id,
      },
    });
    const restoredNft = await Nft.findByPk(id);
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

const changeNftOwner = async (req, res) => {
  try {
    const { newOwnerId } = req.params;
    const { nftIds } = req.body;

    const nfts = await Nft.findAll({
      where : {
        id : nftIds
      }});
      
    if (nfts.length < nftIds.length) throw new Error(`Some nfts were not found`);
    
    const newOwner = await User.findByPk(newOwnerId);
    if (!newOwner) throw new Error(`No user found with id ${newOwnerId}`);
    
    for(const nft of nfts) {
        const oldOwner = await nft.getUser();
        await oldOwner.removeNfts(nft);
        
        nft.set({
          ownerName: newOwner.username,
          ownerIcon: newOwner.profile_pic,
        });
        await nft.save();
    }
    
    await newOwner.addNfts(nfts);
    
    res.json({ message: "Owner NFT changed succesfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getNfts,
  getNftById,
  updateNft,
  addViewsNft,
  createNewNFT,
  deleteNft,
  restoreDeletedNft,
  changeNftOwner,
  getNftQuantity
};
