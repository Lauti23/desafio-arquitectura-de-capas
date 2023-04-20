import { Router } from "express";
import { routeLogs } from "../middlewares/routeLogs.js";
import cartController from "../controllers/cart.controller.js";

export const cartRouter = Router();

cartRouter.get("/", routeLogs, cartController.render)