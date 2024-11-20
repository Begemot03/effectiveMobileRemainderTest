import { Router } from "express";
import RemainderController from "../controllers/remainderController.js";

const remainderRouter = Router();


remainderRouter.route("/remainder")
    .get(RemainderController.all)
    .post(RemainderController.create);

export default remainderRouter;