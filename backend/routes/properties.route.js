import express from "express";
import PropertyController from "../controllers/properties.controller.js";
import { verifyJwt } from "../middleware/verifyJwtFromCookie.js";

const propertyRouter = new express.Router();

const propertyController = new PropertyController();

propertyRouter.post("/create", verifyJwt, (req, res, next) => {
  propertyController.createNewProperty(req, res, next);
});

export default propertyRouter;
