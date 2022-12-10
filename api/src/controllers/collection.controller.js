const { Collection } = require("../db");

const getCollections = async () => {
  const dbCollections = await Collection.findAll();

  if (!dbCollections.length) throw new Error("No collection found");

  return dbCollections;
};

module.exports = { getCollections };
