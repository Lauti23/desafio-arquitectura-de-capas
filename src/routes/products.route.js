import { Router } from "express";
import { routeLogs } from "../middlewares/routeLogs.js";
import productsController from "../controllers/products.controller.js";

export const productsRoute = Router();

productsRoute
    .get("/", routeLogs, productsController.render)

    .get("/sell", routeLogs, productsController.renderSell)

    .post("/sell", routeLogs, productsController.postProduct)