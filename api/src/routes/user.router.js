const { Router } = require("express");
const {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
  restoreDeletedUser,
  verifyUser,
  verifiedToAdmin,
  adminToVerified,
  signInWithGoogle,
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.post("/register", createUser);

userRouter.post("/google/signin", signInWithGoogle);

userRouter.get("/:id", getUserById);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

userRouter.get("/restore/:id", restoreDeletedUser);

userRouter.put("/verify/:id", verifyUser);

userRouter.put("/upgrade/:id", verifiedToAdmin);

userRouter.put("/downgrade/:id", adminToVerified);

module.exports = userRouter;
