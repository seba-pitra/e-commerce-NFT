const { User } = require("../db");

const createUser = async (body) => {
  const newUser = await User.create(body);

  return newUser;
};

const getUserById = async (id) => {
  const foundUserFromDb = await User.findByPk(id);

  if (!foundUserFromDb) throw new Error("No user found");

  return foundUserFromDb;
};

const deleteUser = async (id) => {
  const foundUser = await User.findByPk(id);

  if (!foundUser) throw new Error("No user found");

  if (foundUser.available) foundUser.available = false;
  else if (!foundUser.available) foundUser.available = true;

  await foundUser.save();

  return foundUser.name;
};

module.exports = {
  getUserById,
  deleteUser,
  createUser,
};
