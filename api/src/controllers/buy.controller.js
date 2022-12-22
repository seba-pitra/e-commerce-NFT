const { Buy } = require("../db");

const createNewBuy = async (req, res) => {
    const {payMethod,contract,statusPay} = req.body;
  try {
    if(!payMethod || !contract || !statusPay){
        res.status(422).json({ error: "There are missing values" });
    }
    return res.status(201).json(
        await Buy.create(req.body)
    )
  } catch (err) {
    res.status(400).send({error: err.message})
  }
}

const getBuyById = async (req, res) => {
  try {
    const {id} = req.params
    const foundBuy = await Buy.findByPk(id)
    
    if (foundBuy) {
      res.status(200).json(foundBuy)
    } else {
      throw new Error(`Could not find Buy in database with id: ${id}`)
    }
  } catch (err) {
    res.status(404).send({error: err.message})
  }
}

const getAllBuy = async (req, res) => {
  try {
    const dbBuys = await Buy.findAll()
    // const dbBuys = await Buy.findAll({ include: User })
    res.status(200).json(dbBuys)
  } catch (err) {
    res.status(404).send({error: err.message})
  }
}

module.exports = {
  createNewBuy,
  getAllBuy,
  getBuyById,
};
