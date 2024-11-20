import { Router } from "express";
import ProductController from "../controllers/productController.js";

const productRouter = Router();

productRouter.route("/product")
    .get(ProductController.all)

export default productRouter;
