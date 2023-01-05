const { Purchase, User } = require("../db");

// Create a new purchase and add it to the database
// Crear una nueva compra y agregarla a la base de datos
const createNewPurchase = async (req, res) => {
  try {
    /*
      ¿Deberia recibir el id del usuario 
      y asignar la compra al usuario que hizo la compra.?
      purchase_model = {
        price,
        contract,
        statusPay,
        payMethod,
        purchases (ver nota en modelo de purchases)
        from?
        to?
      }
    */
    const { 
      payMethod, 
      statusPay, 
      purchases
    } = req.body;
    if (!payMethod || !statusPay || !purchases) {
      throw new Error("There are missing values");
    }
    /*
    aca deberia asignar el usuario que hizo la compra y el o los nfts que se compraron.
    */
    res.status(201).json(await Purchase.create(req.body));
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
      include: {
        model: User,
      },
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
      include: {
        model: User,
      },
    });
    res.status(200).json(dbPurchases);
  } catch (err) {
    console.error(err);
    res.status(404).send({ error: err.message });
  }
};

module.exports = {
  createNewPurchase,
  getAllPurchases,
  getPurchaseById,
};
