const { Buy, User } = require("../db");

// Create a new purchase and add it to the database
// Crear una nueva compra y agregarla a la base de datos
const createNewBuy = async (req, res) => {
  const { payMethod, contract, statusPay } = req.body;
  try {
    const { payMethod, statusPay, purchases } = req.body;
    if (!payMethod || !statusPay || !purchases) {
      throw new Error("There are missing values");
    }
    res.status(201).json(await Buy.create(req.body));
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Get purchase through id.
// Conseguir una compra a través del id.
const getBuyById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundBuy = await Buy.findByPk(id, {
      include: {
        model: User,
      },
    });
    if (foundBuy) {
      res.status(200).json(foundBuy);
    } else {
      throw new Error(`Could not find Buy in database with id: ${id}`);
    }
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

// Get a list of all purchases.
// Conseguir el listado de todas las compras.
const getAllBuy = async (req, res) => {
  try {
    const dbBuys = await Buy.findAll({
      include: {
        model: User,
      },
    });
    res.status(200).json(dbBuys);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

module.exports = {
  createNewBuy,
  getAllBuy,
  getBuyById,
};
