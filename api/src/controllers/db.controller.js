const { createAllInitialCollections } = require("../controllers/collection.controller")
const { createAllInitialNFTs } = require("../controllers/nft.controller")
const { Nft, Collection } = require("../db");

const postEverythingToDB = async (req, res) => {
    try {
        const allCollections = await createAllInitialCollections();
        const allNfts = await createAllInitialNFTs();
        res.status(200).json({
            success: "todos los datos creados correctamente"
        })
    }catch (error) {
        res.status(400).json({error : error.message})
    }
}

const getEverythingFromDB = async (req, res) => {
    try {
        const allNfts = await Nft.findAll();
        const allCollections = await Collection.findAll();
        res.status(200).json({
            allNfts : allNfts,
            allCollections : allCollections
        })
    }catch (error) {
        res.status(400).json({error : error.message})
    }
}

module.exports = {
    postEverythingToDB,
    getEverythingFromDB
}