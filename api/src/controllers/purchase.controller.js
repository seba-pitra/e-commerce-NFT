const { Transaction, User, Nft, UserPurchases, UserSales } = require("../db");

const createNewTransaction = async (req, res) => {
  try {
    const { payMethod, price, statusPay, buyerId, sellerId, nftIds } = req.body;

    if (!payMethod || !price || !buyerId || !sellerId || !nftIds) {
      throw new Error("There are missing values");
    }

    const buyer = await User.findByPk(buyerId);

    const seller = await User.findByPk(sellerId);

    if (!buyer) throw new Error(`No buyer found with id : ${buyerId}`);

    if (!seller) throw new Error(`No buyer found with id : ${seller}`);

    const tokens = await Nft.findAll({
      where: { id: nftIds, userId: sellerId },
    });

    if (tokens.length < nftIds.length) {
      throw new Error(
        "Something went wrong, check that all NFTs you are trying to buy belong to the seller and are available for purchase"
      );
    }

    const newTransaction = await Transaction.create({
      price: price,
      payMethod: payMethod,
      statusPay: statusPay,
    });

    await newTransaction.setBuyer(buyer);
    await newTransaction.setSeller(seller);
    await newTransaction.addTokens(tokens);
    await newTransaction.save();

    if (newTransaction.statusPay === "Successful") {
      await seller.removeNfts(tokens);
      for (const nft of tokens) {
        nft.set({
          ownerName: buyer.username,
          userId: seller.id,
        });

        await nft.save();
      }
      await buyer.addNfts(tokens);
    }

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
          through: {
            model: UserSales,
            as: "seller",
          },
          foreignKey: "sellerId",
        },
        { model: Nft, as: "tokens" },
      ],
    });

    res.status(201).json(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

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
    res.status(404).send({ error: err.message });
  }
};

const getAllTransactions = async (req, res) => {
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
    res.status(404).send({ error: err.message });
  }
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
      res.status(200).send({
        message: `Transaction was successful, cannot set as rejected`,
      });
    }
  } catch (error) {
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
      res.status(200).send({
        message: `Transaction was rejected, cannot set as successful`,
      });
    }
  } catch (error) {
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
