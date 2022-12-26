const { createAllInitialCollections } = require("../controllers/collection.controller")
const { createAllInitialNFTs } = require("../controllers/nft.controller")
const { createSuperUser } = require("../controllers/user.controller");
const { Nft, Collection, Buy, User } = require("../db");

const postEverythingToDB = async (req, res) => {
    try {
        const allCollections = await createAllInitialCollections();
        const allNfts = await createAllInitialNFTs();
        const superUser = await createSuperUser();
        if(allCollections && allNfts){
            return res.status(200).json({
                success: "todos los datos creados correctamente",
                collections : allCollections,
                nfts : allNfts,
                superUserData : superUser
            })
        }else{
            throw new Error(`something went wrong`)
        }
    }catch (error) {
        res.status(400).json({error : error.message})
    }
}

const getEverythingFromDB = async (req, res) => {
    try {
        const allNfts = await Nft.findAll();
        const allCollections = await Collection.findAll();
        const allBuys = await Buy.findAll();
        const allUsers = await User.findAll();
        res.status(200).json({
            allUsers : allUsers,
            allNfts : allNfts,
            allCollections : allCollections,
            allBuys : allBuys
        })
    }catch (error) {
        res.status(400).json({error : error.message})
    }
}

module.exports = {
    postEverythingToDB,
    getEverythingFromDB
}