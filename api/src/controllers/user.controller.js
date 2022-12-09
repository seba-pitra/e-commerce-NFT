const { User } = require("../db");

// const createUser = async (body) => {
//   const newUser = await User.create(body);

//   return newUser;
// };

const getUserById = async (id) => {
  const foundUserFromDb = await User.findByPk(id);

  if (!foundUserFromDb) throw new Error("No user found");

  return foundUserFromDb;
};

module.exports = {
  getUserById,
  // createUser,
};
