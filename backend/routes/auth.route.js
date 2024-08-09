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

authRouter.post("/google", (req, res, next) => {
  authController.googleOAuth(req, res, next);
});

authRouter.post("/facebook", (req, res, next) => {
  authController.facebookAuth(req, res, next);
});

authRouter.post("/github", (req, res, next) => {
  authController.githubAuth(req, res, next);
});

authRouter.get("/logout", (req, res, next) => {
  authController.logOut(req, res, next);
});

export default authRouter;
