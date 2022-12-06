// const {  } = require("../db");
const { Router } = require("express");
// const {/*controllers */} = require("../controllers/Controllers");

const nftRouter = Router();

nftRouter.post("/", async (req, res) => {
  // try {
  //   res.status(201).json();
  // } catch (err) {
  //   res.status(400).send(err.message);
  // }
});

nftRouter.get("/", async (req, res) => {
  // try {
  //   const { name } = req.query;
  //   if (name) {
  //     const foundNft = await searchByName(name);
  //     res.status(200).json(foundNft);
  //   } else {
  //     const dogs = await getDogs();
  //     res.status(200).json(dogs);
  //   }
  // } catch (err) {
  //   res.status(404).send(err.message);
  // }
});

nftRouter.get("/:id", async (req, res) => {
  // try {
  //   const { id } = req.params;
  //   const foundDog = await searchById(id);
  //   res.status(200).json(foundDog);
  // } catch (err) {
  //   res.status(404).send(err.message);
  // }
});

nftRouter.put("/:attribute", async (req, res) => {
  // try {
  //   const { attribute } = req.params;
  //   const { nftId } = req.query;
  //   const { value } = req.body;
  //   const dogName = await update(attribute, value, nftId);
  //   res.status(200).send(`Se actualizaron los datos de ${}`);
  // } catch (err) {
  //   res.status(404).send(err.message);
  // }
});

nftRouter.delete("/:id", async (req, res) => {
  // try {
  //   const { id } = req.params;
  //   const dogName = await deleteController(id);
  //   res.status(200).send(`${nftName} fue borrado con éxito`);
  // } catch (err) {
  //   res.status(404).send(err.message);
  // }
});

module.exports = nftRouter;
