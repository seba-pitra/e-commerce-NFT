const { Purchase, User } = require("../db");

// Create a new purchase and add it to the database
// Crear una nueva compra y agregarla a la base de datos
const createNewPurchase = async (req, res) => {
  try {
    const {
      payMethod,
      price,
      buyerId,
      sellerId,
      nftIds
    } = req.body;
    if (
      !payMethod || 
      !statusPay ||
      !price ||
      !buyerId ||
      !sellerId ||
      !nftIds
      ) {
      throw new Error("There are missing values");
    }
    const buyer = await User.findByPk(buyerId);
    const seller = await User.findByPk(sellerId);
    if (!buyer){ throw new Error(`No buyer found with id : ${buyerId}`);}
    if (!seller){ throw new Error(`No buyer found with id : ${seller}`);}
    const tokens = await Nft.findAll({
      where : {id : nftIds}
    })
    if(tokens.length < nftIds.length) {
      throw new Error("some of the given ids dont belong to any nft on the database.")
    }
    const newPurchase = await Purchase.create({
      price: price,
      payMethod: payMethod,
    })
    await newPurchase.setBuyer(buyer);
    await newPurchase.setSeller(seller);
    await newPurchase.addTokens(tokens);
    const response = await Purchase.findByPk(newPurchase.id,{
      include : [{
          model : User,
          as: "buyer"
        },{
          model : User,
          as: "seller"
        },{
          model : Nft,
          as : 'tokens'
        }]
    })
    res.status(201).json(response);
  } catch (err) {
    console.error(err)
    res.status(400).send({ error: err.message });
  }
};

// Get purchase through id.
// Conseguir una compra a través del id.
const getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPurchase = await Purchase.findByPk(id, {
      include : [{
        model : User,
        as: "buyer"
      },{
        model : User,
        as: "seller"
      },{
        model : Nft,
        as : 'tokens'
      }]
    });
    if (foundPurchase) {
      res.status(200).json(foundPurchase);
    } else {
      throw new Error(`Could not find Purchase in database with id: ${id}`);
    }
  } catch (err) {
    console.error(err);
    res.status(404).send({ error: err.message });
  }
};

// Get a list of all purchases.
// Conseguir el listado de todas las compras.
const getAllPurchases = async (req, res) => {
  try {
    const dbPurchases = await Purchase.findAll({
      include : [{
        model : User,
        as: "buyer"
      },{
        model : User,
        as: "seller"
      },{
        model : Nft,
        as : 'tokens'
      }]
    });
    res.status(200).json(dbPurchases);
  } catch (err) {
    console.error(err);
    res.status(404).send({ error: err.message });
  }
};

const setPurchaseAsPending = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPurchase = await Purchase.findByPk(id);
    if(!foundPurchase){
      throw new Error(`no purchase found with id : ${id}`);
    }
    if(foundPurchase.statusPay === "Created"){
      foundPurchase.set({
        statusPay: "Pending"
      })
    }else if(foundPurchase.statusPay === "Pending"){
      res.status(200).json({message : "purchase already pending"})
    }else{
      throw new Error(`Purchase already realized`)
    }
  } catch (error) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

const rejectPurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPurchase = await Purchase.findByPk(id);
    if(!foundPurchase){
      throw new Error(`no purchase found with id : ${id}`);
    }
    if(
      foundPurchase.statusPay === "Pending" || 
      foundPurchase.statusPay === "Created"
      )
      {
      foundPurchase.set({
        statusPay: "Rejected"
      })
    }else if(foundPurchase.statusPay === "Rejected"){
      res.status(200).json({message : "purchase already rejected"})
    }else{
      throw new Error(`Something went wrong`)
    }
  } catch (error) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

const purchaseSuccess = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPurchase = await Purchase.findByPk(id);
    if(!foundPurchase){
      throw new Error(`no purchase found with id : ${id}`);
    }
    if(
      foundPurchase.statusPay === "Pending" || 
      foundPurchase.statusPay === "Created"
      )
      {
      foundPurchase.set({
        statusPay: "Successful"
      })
    }else if(foundPurchase.statusPay === "Successful"){
      res.status(200).json({message : "purchase already successful"})
    }else{
      throw new Error(`Something went wrong`)
    }
  } catch (error) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
}

module.exports = {
  createNewPurchase,
  getAllPurchases,
  getPurchaseById,
  rejectPurchase,
  purchaseSuccess
};
