import { Router } from "express";
import ProductController from "../controllers/productController.js";

const productRouter = Router();

productRouter.route("/product/:filter")
    .get(ProductController.get)

productRouter.route("/product")
    .get(ProductController.all)
    .post(ProductController.create)



export default productRouter;
