import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = express.Router();

const authController = new AuthController();

authRouter.post("/sign-up", (req, res, next) => {
  authController.signUp(req, res, next);
});

authRouter.post("/sign-in", (req, res, next) => {
  authController.signIn(req, res, next);
});
export default authRouter;
