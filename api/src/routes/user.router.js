const { Router } = require("express");
const {
  getAllUsers,
  getUserById,
  deleteUser,
  registerUser,
  updateUser,
  restoreDeletedUser,
  userAsksForVerification,
  verifiedToAdmin,
  adminToVerified,
  signInWithGoogle,
  verifyUser,
  rejectVerification
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.post("/register", registerUser);

userRouter.post("/google/signin", signInWithGoogle);

userRouter.get("/:id", getUserById);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

userRouter.get("/restore/:id", restoreDeletedUser);

userRouter.put("/ask/:id", userAsksForVerification);

userRouter.put("/verify/:id", verifyUser);

userRouter.put("/reject/:id", rejectVerification);

userRouter.put("/upgrade/:id", verifiedToAdmin);

userRouter.put("/downgrade/:id", adminToVerified);

module.exports = userRouter;
