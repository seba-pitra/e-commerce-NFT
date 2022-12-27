const { createAllInitialCollections } = require("../controllers/collection.controller")
const { createAllInitialNFTs, createNftQuantityByChoice } = require("../controllers/nft.controller")
const { createSuperUser } = require("../controllers/user.controller");
const { Nft, Collection, Buy, User } = require("../db");


//Creates every initial data, and posts it to the database.
const postEverythingToDB = async (req, res) => {
    try {
        console.log("Starting database injection..." + new Date().toString())
        const [superUser, allCollections, allNfts] = await generateEverything();
        if(allCollections.length > 0 && allNfts.length > 0 && superUser){
            console.log("Everything on database: " + new Date().toString())
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

//Create only 100 nfts for testing purposes
const postQuantityToDB = async (req, res) => {
    try {
        const { nftQuantity } = req.params
        if(nftQuantity > 1600){
            throw new Error("Number should be equal or less than 1600");
        }
        console.log("Starting database injection of " + nftQuantity + " nfts... " + new Date().toString())
        
        const [superUser, allCollections, allNfts] = await generateEverythingByChoice(parseInt(nftQuantity));

        if(allCollections.length > 0 && allNfts.length > 0 && superUser){
            console.log("Everything on database: " + new Date().toString())
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
        const allNfts = await Nft.findAll({
            include : {
                model : Collection
            }
        });
        const allCollections = await Collection.findAll({
            include : {
                model : Nft
            }
        });
        const allBuys = await Buy.findAll({
            include : {
                model : User
            }
        });
        const allUsers = await User.findAll({
            include : [{
                model : Collection
            },{
                model: Nft
            }]
        });
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

//Generate only one hundred nfts.
const generateEverythingByChoice = async (nftQuantity) => {
    try {
        const response = [];

        const superUser = await createSuperUser();

        response.push(superUser);

        const allCollections = await createAllInitialCollections();

        response.push(allCollections);

        const hundredNfts = await createNftQuantityByChoice(nftQuantity);

        response.push(hundredNfts);

        return response;
    }catch(error) {
        throw new Error(error.message);
    }
}

//Generate all nfts and all collections
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
    getEverythingFromDB,
    postQuantityToDB
}