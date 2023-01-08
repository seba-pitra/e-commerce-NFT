const { Router } = require("express");
const userControllers = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", userControllers.getAllUsers);

userRouter.post("/register", userControllers.registerUser);

userRouter.post("/google/signin", userControllers.signInWithGoogle);

userRouter.get("/:id", userControllers.getUserById);

userRouter.put("/:id", userControllers.updateUser);

userRouter.delete("/:id", userControllers.deleteUser);

userRouter.get("/restore/:id", userControllers.restoreDeletedUser);

userRouter.put("/ask/:id", userControllers.userAsksForVerification);

userRouter.put("/verify/:id", userControllers.verifyUser);

userRouter.put("/reject/:id", userControllers.rejectVerification);

userRouter.put("/upgrade/:id", userControllers.verifiedToAdmin);

userRouter.put("/downgrade/:id", userControllers.adminToVerified);

module.exports = userRouter;
