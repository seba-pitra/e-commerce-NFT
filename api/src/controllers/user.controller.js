const { User, Nft, Collection, Transaction,UserPurchases,UserSales } = require("../db");
const { superUser } = require("../jsondata/superUserData.json");
const { SUPER_USER_DATA } = require("../jsondata/superUserData.json");
const SUPER_USER_DATA_ID = SUPER_USER_DATA.id;
const registerUser = async (req, res) => {
  try {
    const { id, username, email, profile_pic } = req.body;
    const newUser = await User.create({
      id: id,
      username: username,
      email: email,
      profile_pic: profile_pic,
    });
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message, error_detail: err });
  }
};

const signInWithGoogle = async (req, res) => {
  try {
    const userData = req.body;
    const [newUser, created] = await User.findOrCreate({
      where: { id: userData.id },
      defaults: userData,
      include: [
        { model: Nft },
        { model: Collection },
        {
          model: Transaction,
          as: "purchases",
          through: {
            model: UserPurchases,
            as: "purchases",
          },
          foreignKey: "buyerId",
        },
        {
          model: Transaction,
          as: "sales",
          through: {
            model: UserSales,
            as: "sales",
          },
          foreignKey: "sellerId",
        },
      ],
    });
    if (!created) {
      newUser.set(userData);
      await newUser.save();
    }
    res.status(200).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      include: [
        { model: Nft },
        { model: Collection },
        {
          model: Transaction,
          as: "purchases",
          through: {
            model: UserPurchases,
            as: "purchases",
          },
          foreignKey: "purchaseId",
        },
        {
          model: Transaction,
          as: "sales",
          through: {
            model: UserSales,
            as: "sales",
          },
          foreignKey: "saleId",
        },
      ],
      paranoid: req.query.deleted === "include" ? false : true,
    });
    if (allUsers.length === 0) {
      throw new Error(`No users found on database`);
    } else {
      return res.status(200).json(allUsers);
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const foundUser = await User.findByPk(id);
    if (foundUser) {
      foundUser.set(dataToUpdate);
      await foundUser.save();
      return res.status(200).send(foundUser);
    } else {
      throw new Error(`No user with id ${id}`);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await User.findByPk(id, {
      include: [
        { model: Nft },
        { model: Collection },
        {
          model: Transaction,
          as: "purchases",
          through: {
            model: UserPurchases,
            as: "purchases",
          },
          foreignKey: "buyerId",
        },
        {
          model: Transaction,
          as: "sales",
          through: {
            model: UserSales,
            as: "sales",
          },
          foreignKey: "sellerId",
        },
      ],
    });
    if (foundUser) {
      return res.status(200).json(foundUser);
    } else {
      throw new Error(`No user found with id: ${id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByPk(id);
    if (deletedUser) {
      await User.destroy({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .send(`${deletedUser.username}  successfully deleted`);
    } else {
      throw new Error(`no NFT found with id: ${id}`);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ error: err.message });
  }
};

const restoreDeletedUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.restore({
      where: {
        id: id,
      },
    });

    const restoredUser = await User.findByPk(id);

    if (restoredUser) {
      return res.status(200).json({
        user: restoredUser,
        message: `${restoredUser.username} successfully restored`,
      });
    } else {
      throw new Error(`No nft found with id ${id}`);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ err: err.message });
  }
};

const userAsksForVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      last_name,
      age,
      metamask_wallet,
      face_picture,
      dni_image_front,
      dni_image_back,
      phone_number,
      nationality,
      address,
      dni,
    } = req.body;

    // aca iria la valdacion de datos

    const user = await User.findByPk(id);
    if (user) {
      if (user.type === "Basic") {
        user.set({
          name: name,
          last_name: last_name,
          age: age,
          metamask_wallet: metamask_wallet,
          face_picture: face_picture,
          dni_image_front: dni_image_front,
          dni_image_back: dni_image_back,
          phone_number: phone_number,
          nationality: nationality,
          address: address,
          dni: dni,
          type: "VerificationInProcess",
        });
        await user.save();
        return res.status(200).json({
          user: user,
          message: "Verification Reques Successful",
        });
      } else if (user.type === "VerificationInProcess") {
        res
          .status(200)
          .send("User already asked for verification, waiting for admin");
      } else {
        res.status(200).send("User already verified");
      }
    } else {
      throw new Error(`No user found with id ${id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const verifiedToAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      if (user.type === "Verified") {
        user.set({
          type: "Admin",
        });
        await user.save();
        return res.status(200).json({
          user: user,
          type: user.type,
        });
      } else if (
        user.type === "Basic" ||
        user.type === "VerificationInProcess"
      ) {
        throw new Error(`User not verified`);
      } else {
        res.status(200).send(`User is already an admin`);
      }
    } else {
      throw new Error(`No user found with id ${id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const adminToVerified = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      if (user.type === "Admin") {
        user.set({
          type: "Verified",
        });
        await user.save();
        return res.status(200).json({
          user: user,
          type: user.type,
        });
      } else {
        throw new Error(`User not admin`);
      }
    } else {
      throw new Error(`No user found with id ${id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      if (user.type === "VerificationInProcess") {
        user.set({
          type: "Verified",
        });
        await user.save();
        return res.status(200).json({
          user: user,
        });
      } else if (user.type === "Basic") {
        throw new Error(`User did not ask for verification`);
      } else {
        res.status(200).send(`User is already verified`);
      }
    } else {
      throw new Error(`No user found with id ${id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const rejectVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      if (user.type === "VerificationInProcess") {
        user.set({
          type: "Basic",
          name: null,
          last_name: null,
          age: null,
          metamask_wallet: null,
          face_picture: null,
          dni_image_front: null,
          dni_image_back: null,
          phone_number: null,
          nationality: null,
          address: null,
          dni: null,
        });
        await user.save();
        res.status(200).json(user);
      } else if (user.type === "Basic") {
        throw new Error(`User did not ask for verification`);
      } else {
        res.status(200).send(`User is already verified`);
      }
    } else {
      throw new Error(`No user found with id ${id}`);
    }
  } catch (error) {}
};

/*
 * Super user data
 */
const createSuperUser = async () => {
  try {
    let response = await User.findOne({
      where: {
        id: SUPER_USER_DATA.id,
      },
    });
    if (!response) {
      response = await User.create({
        id: SUPER_USER_DATA.id,
        username: SUPER_USER_DATA.username,
        name: SUPER_USER_DATA.name,
        last_name: SUPER_USER_DATA.last_name,
        email: SUPER_USER_DATA.email,
        type: SUPER_USER_DATA.type,
        profile_pic: SUPER_USER_DATA.profile_pic,
      });
    }
    console.log("Super user created");
    return response;
  } catch (error) {
    console.error("User error message", error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  registerUser,
  signInWithGoogle,
  updateUser,
  restoreDeletedUser,
  userAsksForVerification,
  createSuperUser,
  verifiedToAdmin,
  adminToVerified,
  verifyUser,
  rejectVerification,
};
