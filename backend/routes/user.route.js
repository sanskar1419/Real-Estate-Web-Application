import express from "express";
import UserController from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/verifyJwtFromCookie.js";

const userRouter = new express.Router();

const userController = new UserController();

userRouter.post("/update/:id", verifyJwt, (req, res, next) => {
  userController.updateUser(req, res, next);
});

export default userRouter;
