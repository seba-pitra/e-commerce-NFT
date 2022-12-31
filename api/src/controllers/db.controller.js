const { createAllInitialCollections } = require("../controllers/collection.controller")
const { createInitialNFTs } = require("../controllers/nft.controller")
const { createSuperUser } = require("../controllers/user.controller");
const { Nft, Collection, Buy, User } = require("../db");


//Creates every initial data, and posts it to the database.
const postNftsToDB = async (req, res) => {
    try {
        let { nftQuantity } = req.params
        if (!nftQuantity){
            nftQuantity = 1600
        }else{
            nftQuantity = parseInt(nftQuantity)
        }
        if(nftQuantity > 1600){
            throw new Error("Number should be equal or less than 1600");
        }
        console.log("Starting database injection of " + nftQuantity + " nfts... " + new Date().toString())
        
        const [superUser, allCollections, allNfts] = await generateEverything(nftQuantity);

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
            include : [{
                model : Collection
            }, {
                model : User,
            }]
        });
        const allCollections = await Collection.findAll({
            include : [{
                model : Nft
            },{
                model : User,
            }]
        });
        const allBuys = await Buy.findAll({
            include : {
                model : User,
            }
        });
        const allUsers = await User.findAll({
            include : [{
                model : Collection
            },{
                model: Nft
            },{
                model : Buy,
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

        const hundredNfts = await createInitialNFTs(nftQuantity);

        response.push(hundredNfts);

        return response;
    }catch(error) {
        throw new Error(error.message);
    }
}

//Generate all nfts and all collections
const generateEverything = async (nftQuantity) => {
    try {
        const response = [];

        const superUser = await createSuperUser();

        response.push(superUser);

        const allCollections = await createAllInitialCollections();
        response.push(allCollections);

        const allNfts = await createInitialNFTs(nftQuantity);

        response.push(allNfts);

        return response;
    }catch(error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getEverythingFromDB,
    postNftsToDB
}