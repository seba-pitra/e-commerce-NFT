const { createAllInitialCollections } = require("../controllers/collection.controller")
const { createAllInitialNFTs } = require("../controllers/nft.controller")
const { createSuperUser } = require("../controllers/user.controller");
const { Nft, Collection, Buy, User } = require("../db");


//Creates every initial data, and posts it to the database.
const postEverythingToDB = async (req, res) => {
    try {
        const [superUser, allCollections, allNfts] = await generateEverything();
        console.log(superUser)
        console.log(allCollections.length)
        console.log(allNfts.length)
        if(allCollections.length > 0 && allNfts.length > 0 && superUser){
            return res.status(200).json({
                success: "todos los datos creados correctamente",
                collections : allCollections,
                nfts : allNfts,
                superUserData : superUser
            });
        }else{
            throw new Error(`something went wrong`)
        }
    }catch (error) {
        res.status(400).json({error : error.message})
    }
}

//Returns all data that is present in the database.
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

const generateEverything = async () => {
    try {
        const response = [];

        const superUser = await createSuperUser();

        response.push(superUser);

        const allCollections = await createAllInitialCollections();
        response.push(allCollections);

        const allNfts = await createAllInitialNFTs();

        response.push(allNfts);

        return response;
    }catch(error) {
        throw new Error(error.message);
    }
}

module.exports = {
    postEverythingToDB,
    getEverythingFromDB
}