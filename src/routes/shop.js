import { Router } from "express"
import ShopController from "../controllers/shopController.js";

const shopRouter = Router();

shopRouter.route("/shop")
    .get(ShopController.all)
    .post(ShopController.create);

export default shopRouter;