const { Router } = require("express");
const {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
  restoreDeletedUser,
  verifyUser,
  basicToAdmin
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.post("/", createUser);

userRouter.get("/:id", getUserById);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

userRouter.get("/restore/:id", restoreDeletedUser)

userRouter.put("/verify/:id", verifyUser);

userRouter.put("/upgrade/:id", basicToAdmin);

module.exports = userRouter;
