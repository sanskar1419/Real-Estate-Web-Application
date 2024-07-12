import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = express.Router();

const authController = new AuthController();

authRouter.post("/sign-up", (req, res) => {
  authController.signUp(req, res);
});

export default authRouter;
