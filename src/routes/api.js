import express from "express";
import productRouter from "./product.js";
import shopRouter from "./shop.js";
import remainderRouter from "./remainder.js";

const apiRouter = express.Router();

apiRouter.all("*", [productRouter, shopRouter, remainderRouter]);

export default apiRouter;
