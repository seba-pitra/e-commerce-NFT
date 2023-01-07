const { createAllInitialCollections } = require("../controllers/collection.controller")
const { createInitialNFTs } = require("../controllers/nft.controller")
const { createSuperUser } = require("../controllers/user.controller");
const { Nft, Collection, Purchase, User } = require("../db");


//Creates every initial data, and posts it to the database.
const postNftsToDB = async (req, res) => {
    try {
        console.log("Starting database injection of " + req.params.nftQuantity + " nfts... " + new Date().toString())
        
        const [superUser, allCollections, allNfts] = await generateEverything(req);

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
        console.error(error)
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
            }, {
                model : Review
            },{
                model : Purchase
            }]
        });
        const allCollections = await Collection.findAll({
            include : [{
                model : Nft
            },{
                model : User,
            }, {
                model : Review
            }]
        });
        const allPurchases = await Purchase.findAll({
            include : [{
                model : User,
                as : "buyer"
            },{
                model : User,
                as : "seller"
            },{
                model : Nft,
                as : "tokens"
            }]
        });
        const allUsers = await User.findAll({
            include : [{
                model : Collection
            },{
                model: Nft
            },{
                model : Purchase,
                as: "sales"
            },{
                model : Purchase,
                as : "purchases"
            }]
        });
        res.status(200).json({
            allUsers : allUsers,
            allNfts : allNfts,
            allCollections : allCollections,
            allPurchases : allPurchases
        })
    }catch (error) {
        console.error(error)
        res.status(400).json({error : error.message})
    }
}

//Generate all nfts and all collections
const generateEverything = async (req) => {
    try {
        const response = [];

        const superUser = await createSuperUser();

        response.push(superUser);

        const allCollections = await createAllInitialCollections();
        response.push(allCollections);

        const allNfts = await createInitialNFTs(req);

        response.push(allNfts);

        return response;
    }catch(error) {
        console.error(error);
        throw new Error(`Function: generateEverything() caught => ${error.message}`);
    }
}

module.exports = {
    getEverythingFromDB,
    postNftsToDB
}