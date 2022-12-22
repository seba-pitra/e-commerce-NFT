const { Router } = require("express");
const {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
  restoreDeletedUser
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.post("/", createUser);

userRouter.get("/:id", getUserById);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

userRouter.get("/restore/:id", restoreDeletedUser)

module.exports = userRouter;
