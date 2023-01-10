const JSON_NFTS = require("../jsondata");
const TEST_NFTS = require("../jsondata/indexTest");
const { COLLETION_DATA } = require("../jsondata/collections.json");
const { SUPER_USER_DATA } = require("../jsondata/superUserData.json");
const SUPER_USER_DATA_ID = SUPER_USER_DATA.id;

const { createSuperUser } = require("../controllers/user.controller");
const { Nft, Collection, Transaction, User, Review } = require("../db");
const utils = require("../utils");


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
                model : Transaction
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
        const allTransactions = await Transaction.findAll({
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
                model : Transaction,
                as: "sales"
            },{
                model : Transaction,
                as : "purchases"
            }]
        });
        res.status(200).json({
            allUsers : allUsers,
            allNfts : allNfts,
            allCollections : allCollections,
            allTransactions : allTransactions
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
};

/*
    controllers to create and post collections to db
*/

const createAllInitialCollections = async () => {
    try {
    let response = await Collection.findAll({});
    const userOwner = await User.findOne({
        where: {
        id: SUPER_USER_DATA_ID,
        },
    });
    if (response.length === 0) {
        console.log("Starting collections creation " + new Date().toString());
        for (const collection of COLLETION_DATA) {
        const collectionInDB = await Collection.create({
            contract: collection.id,
            name: collection.name || "No name",
            image: collection.image || "No image",
            origin: "API",
        });
        collectionInDB.setUser(userOwner);
        response.push(collectionInDB);
        console.log(
            "---------------------------\n" +
            "Collection n°" +
            response.length +
            " \n" +
            "Name: " +
            collectionInDB.name +
            " \n" +
            "Created at: " +
            new Date().toString() +
            " \n" +
            userOwner.name +
            " \n" +
            "---------------------------"
        );
        }
    }
    console.log(
        "Collection Creation SUCESSFUL" +
        response.length +
        " collections created " +
        "Date: " +
        new Date().toString()
    );
    return response;
    } catch (err) {
    console.log(err);
    throw new Error(
        `Function: createAllInitialCollections() caught => ${err.message}`
    );
    }
};

const createInitialNFTs = async (req) => {
    try {
    let allCreatedNfts = await Nft.findAll({});

    if (allCreatedNfts.length === 0) {
        let nfts = req.query.test === "true" ? TEST_NFTS : JSON_NFTS;
        let { nftQuantity } = req.params;
        if (!nftQuantity) {
        nftQuantity = nfts.length;
        } else {
        nftQuantity = parseInt(nftQuantity);
        }
        if (nftQuantity > nfts.length) {
        throw new Error("Number should be equal or less than" + nfts.length);
        }
        console.log("Starting NFTs creation database. " + new Date().toString());

        nfts = nfts.slice(0, nftQuantity);

        allCreatedNfts = await nftCreator(nfts, allCreatedNfts);
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
    throw new Error(
        `Function: createAllInitialNFTs() caught error: ${err.message}`
    );
    }
};

// Function that creates nfts bases on data on json files.
const nftCreator = async (nftsToCreate, responseArray) => {
    const superUser = await User.findOne({
    where: {
        id: SUPER_USER_DATA_ID,
    },
    });
    for (const nft of nftsToCreate) {
    //se diseña el name en base a los datos.
    let nftName = utils.nftNameCreatorFor(nft);
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
};

module.exports = {
    getEverythingFromDB,
    postNftsToDB
}