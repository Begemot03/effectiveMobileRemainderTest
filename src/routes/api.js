import express from "express";
import productRouter from "./product.js";

const apiRouter = express.Router();

apiRouter.all("*", [ productRouter ])

export default apiRouter;