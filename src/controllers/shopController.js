import shopSchema from "../entities/shopSchema.js";
import Shop from "../models/shop.js";
import BaseController from "./baseController.js";

export default class ShopController extends BaseController {
	static async all(req, res) {
		try {
			const shopRepository = ShopController.getRepository(shopSchema);
			const shops = await shopRepository.find();

			return res.status(200).json({ data: shops });
		} catch (error) {
			return ShopController.handleError(res, "Error fetching shops", 500);
		}
	}

	static async create(req, res) {
		try {
			const shopRepository = ShopController.getRepository(shopSchema);
			const shop = new Shop();

			await shopRepository.save(shop);

			return res.status(201).json({ data: shop });
		} catch (error) {
			return ShopController.handleError(res, "Error fetching shops", 500);
		}
	}
}
