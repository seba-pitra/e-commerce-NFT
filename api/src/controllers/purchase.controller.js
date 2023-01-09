const { Purchase, User, Nft } = require("../db");

// Create a new purchase and add it to the database
// Crear una nueva compra y agregarla a la base de datos
const createNewPurchase = async (req, res) => {
  try {
    // Obtiene los valores del cuerpo de la solicitud
    const { payMethod, price, statusPay, buyerId, sellerId, nftIds } = req.body;
    
    // Si alguno de los valores especificados es `null` o `undefined`, lanza un error
    if (!payMethod || !price || !buyerId || !sellerId || !nftIds) {
      throw new Error("There are missing values");
    }
    
    // Busca al comprador y al vendedor de acuerdo a sus IDs
    const buyer = await User.findByPk(buyerId);
    const seller = await User.findByPk(sellerId);
    
    // Si no se encuentra al comprador, lanza un error
    if (!buyer) throw new Error(`No buyer found with id : ${buyerId}`);
    
    // Si no se encuentra al vendedor, lanza un error
    if (!seller) throw new Error(`No buyer found with id : ${seller}`);
    
    // Busca los NFTs que se están comprando, verificando que el vendedor sea el propietario de estos
    const tokens = await Nft.findAll({
      where: { id: nftIds, userId : sellerId },
    });
    
    // Si la cantidad de NFTs encontrados es menor a la cantidad de IDs especificados, lanza un error
    if (tokens.length < nftIds.length) {
      throw new Error(
        "Something went wrong, check that all NFTs you are trying to buy belong to the seller and are available for purchase"
      );
    }
    
    // Crea una nueva compra en la base de datos con los valores especificados
    const newPurchase = await Purchase.create({
      price: price,
      payMethod: payMethod,
      statusPay: statusPay,
    });
    
    // Establece las relaciones entre la compra y el comprador, vendedor y los NFTs involucrados
    await newPurchase.setBuyer(buyer);
    await newPurchase.setSeller(seller);
    await newPurchase.addTokens(tokens);
    
    // Si el pago fue exitoso, actualiza los propietarios de los NFTs
    if(newPurchase.statusPay === "Successful") {
      await seller.removeNfts(tokens)
      await buyer.addNfts(tokens);
    }
    
    // Busca la compra recién creada y devuelve su información, incluyendo los detalles del comprador, vendedor y los NFTs involucrados
    const response = await Purchase.findByPk(newPurchase.id, {
      include: [{ model: User, as: "buyer" }, { model: User, as: "seller" }, { model: Nft, as: "tokens" }],
    });
    
    // Devuelve una respuesta con el estado 201 y la información de la compra
    res.status(201).json(response);
  } catch (err) {
    // Si ocurre un error, lo imprime en la consola y devuelve una respuesta con el error
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

// Get purchase through id.
// Conseguir una compra a través del id.
const getPurchasesByUserAsBuyer = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPurchases = await Purchase.findAll({
      where: {
        buyerId: id,
      },
      include: [
        {
          model: User,
          as: "buyer",
        },
        {
          model: User,
          as: "seller",
        },
        {
          model: Nft,
          as: "tokens",
        },
      ],
    });
    if (foundPurchases) {
      res.status(200).json(foundPurchases);
    } else {
      throw new Error(`Could not find any purchases for user with id: ${id}`);
    }
  } catch (err) {
    console.error(err);
    res.status(404).send({ error: err.message });
  }
};

const getPurchasesByUserAsSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPurchases = await Purchase.findAll({
      where: {
        sellerId: id,
      },
      include: [
        {
          model: User,
          as: "buyer",
        },
        {
          model: User,
          as: "seller",
        },
        {
          model: Nft,
          as: "tokens",
        },
      ],
    });
    if (foundPurchases) {
      res.status(200).json(foundPurchases);
    } else {
      throw new Error(`Could not find any purchases for user with id: ${id}`);
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
      include: [ { model: User, as: "buyer" }, { model: User, as: "seller" }, { model: Nft, as: "tokens", }], 
      paranoid : req.query.deleted === "include" ? false : true
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
    if (!foundPurchase) {
      throw new Error(`no purchase found with id : ${id}`);
    }
    if (foundPurchase.statusPay === "Created") {
      foundPurchase.set({
        statusPay: "Pending",
      });
    } else if (foundPurchase.statusPay === "Pending") {
      res.status(200).json({ message: "purchase already pending" });
    } else {
      throw new Error(`Purchase already realized`);
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
    if (!foundPurchase) {
      throw new Error(`no purchase found with id : ${id}`);
    }
    if (
      foundPurchase.statusPay === "Pending" ||
      foundPurchase.statusPay === "Created"
    ) {
      foundPurchase.set({
        statusPay: "Rejected",
      });
    } else if (foundPurchase.statusPay === "Rejected") {
      res.status(200).json({ message: "purchase already rejected" });
    } else {
      res
        .status(200)
        .send({ message: `Purchase was successful, cannot set as rejected` });
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
    if (!foundPurchase) {
      throw new Error(`no purchase found with id : ${id}`);
    }
    if (
      foundPurchase.statusPay === "Pending" ||
      foundPurchase.statusPay === "Created"
    ) {
      foundPurchase.set({
        statusPay: "Successful",
      });
    } else if (foundPurchase.statusPay === "Successful") {
      res.status(200).json({ message: "purchase already successful" });
    } else {
      res
        .status(200)
        .send({ message: `Purchase was rejected, cannot set as successful` });
    }
  } catch (error) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

module.exports = {
  createNewPurchase,
  getAllPurchases,
  getPurchasesByUserAsBuyer,
  getPurchasesByUserAsSeller,
  rejectPurchase,
  purchaseSuccess,
  setPurchaseAsPending,
};
