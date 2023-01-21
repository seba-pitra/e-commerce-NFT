const { Transaction, User, Nft ,UserPurchases,UserSales} = require("../db");

// Create a new purchase and add it to the database
// Crear una nueva compra y agregarla a la base de datos
const createNewTransaction = async (req, res) => { 
/*
  try {
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
      where: { id: nftIds, userId: sellerId },
    });

    // Si la cantidad de NFTs encontrados es menor a la cantidad de IDs especificados, lanza un error
    if (tokens.length < nftIds.length) {
      throw new Error(
        "Something went wrong, check that all NFTs you are trying to buy belong to the seller and are available for purchase"
      );
    }

    // Crea una nueva compra en la base de datos con los valores especificados
    const newTransaction = await Transaction.create({
      price: price,
      payMethod: payMethod,
      statusPay: statusPay,
    });

    // Establece las relaciones entre la compra y el comprador, vendedor y los NFTs involucrados
    await newTransaction.setBuyer(buyer);
    await newTransaction.setSeller(seller);
    await newTransaction.addTokens(tokens);
    await newTransaction.save();

    // Si el pago fue exitaloso, actuiza los propietarios de los NFTs
    if (newTransaction.statusPay === "Successful") {
      await seller.removeNfts(tokens);
      for (const nft of tokens) {
        nft.set({
          ownerName: buyer.username,
          userId:seller.id
        });
        // Guarda los cambios en la base de datos
        await nft.save();
      }
      await buyer.addNfts(tokens);
    }

    // Busca la compra recién creada y devuelve su información, incluyendo los detalles del comprador, vendedor y los NFTs involucrados
    const response = await Transaction.findByPk(newTransaction.id, {
      include: [
        {
          model: User,
          as: "buyer",
          through: {
            model: UserPurchases,
            as: "buyer",
          },
          foreignKey: "buyerId",
        },
        {
          model: User,
          as: "seller",
          through:{
            model: UserSales,
            as: "seller",
            
          },
          foreignKey:'sellerId'
          
        },
        { model: Nft, as: "tokens" },
      ],
    });

    // Devuelve una respuesta con el estado 201 y la información de la compra
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
*/
};

// Get purchase through id.
// Conseguir una compra a través del id.
const getTransactionsByUserAsBuyer = async (req, res) => {
  try {
    const { id } = req.params;
    const foundTransactions = await Transaction.findAll({
      where: {
        buyerId: id,
      },
      include: [
        {
          model: User,
          as: "buyer",
          through: {
            model: UserPurchases,
            as: "buyer",
          },
          foreignKey: "buyerId",
        },
        {
          model: User,
          as: "seller",
          through: {
            model: UserSales,
            as: "seller",
          },
          foreignKey: "sellerId",
        },
        {
          model: Nft,
          as: "tokens",
        },
      ],
    });
    if (foundTransactions) {
      res.status(200).json(foundTransactions);
    } else {
      throw new Error(`Could not find any purchases for user with id: ${id}`);
    }
  } catch (err) {
    console.error(err);
    res.status(404).send({ error: err.message });
  }
};

const getTransactionsByUserAsSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const foundTransactions = await Transaction.findAll({
      where: {
        sellerId: id,
      },
      include: [
        {
          model: User,
          as: "buyer",
          through: {
            model: UserPurchases,
            as: "buyer",
          },
          foreignKey: "buyerId",
        },
        {
          model: User,
          as: "seller",
          through: {
            model: UserSales,
            as: "seller",
          },
          foreignKey: "sellerId",
        },
        {
          model: Nft,
          as: "tokens",
        },
      ],
    });
    if (foundTransactions) {
      res.status(200).json(foundTransactions);
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
const getAllTransactions = async (req, res) => {
 /*
	try {
    const dbTransactions = await Transaction.findAll({
      include: [
        {
          model: User,
          as: "buyer",
          through: {
            model: UserPurchases,
            as: "buyer",
          },
          foreignKey: "buyerId",
        },
        {
          model: User,
          as: "seller",
          through: {
            model: UserSales,
            as: "seller",
          },
          foreignKey: "sellerId",
        },
        { model: Nft, as: "tokens" },
      ],
      paranoid: req.query.deleted === "include" ? false : true,
    });
    res.status(200).json(dbTransactions);
  } catch (err) {
    console.error(err);
    res.status(404).send({ error: err.message });
  }
*/
};

const setTransactionAsPending = async (req, res) => {
  try {
    const { id } = req.params;
    const foundTransaction = await Transaction.findByPk(id);
    if (!foundTransaction) {
      throw new Error(`no purchase found with id : ${id}`);
    }
    if (foundTransaction.statusPay === "Created") {
      foundTransaction.set({
        statusPay: "Pending",
      });
    } else if (foundTransaction.statusPay === "Pending") {
      res.status(200).json({ message: "purchase already pending" });
    } else {
      throw new Error(`Transaction already realized`);
    }
  } catch (error) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

const rejectTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const foundTransaction = await Transaction.findByPk(id);
    if (!foundTransaction) {
      throw new Error(`no purchase found with id : ${id}`);
    }
    if (
      foundTransaction.statusPay === "Pending" ||
      foundTransaction.statusPay === "Created"
    ) {
      foundTransaction.set({
        statusPay: "Rejected",
      });
    } else if (foundTransaction.statusPay === "Rejected") {
      res.status(200).json({ message: "purchase already rejected" });
    } else {
      res
        .status(200)
        .send({
          message: `Transaction was successful, cannot set as rejected`,
        });
    }
  } catch (error) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

const purchaseSuccess = async (req, res) => {
  try {
    const { id } = req.params;
    const foundTransaction = await Transaction.findByPk(id);
    if (!foundTransaction) {
      throw new Error(`no purchase found with id : ${id}`);
    }
    if (
      foundTransaction.statusPay === "Pending" ||
      foundTransaction.statusPay === "Created"
    ) {
      foundTransaction.set({
        statusPay: "Successful",
      });
    } else if (foundTransaction.statusPay === "Successful") {
      res.status(200).json({ message: "purchase already successful" });
    } else {
      res
        .status(200)
        .send({
          message: `Transaction was rejected, cannot set as successful`,
        });
    }
  } catch (error) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

module.exports = {
  createNewTransaction,
  getAllTransactions,
  getTransactionsByUserAsBuyer,
  getTransactionsByUserAsSeller,
  rejectTransaction,
  purchaseSuccess,
  setTransactionAsPending,
};
