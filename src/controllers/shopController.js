import AppDataSource from "../data-source.js";
import shopSchema from "../entities/shopSchema.js";
import Shop from "../models/shop.js";

export default class ShopController {
	static async all(req, res) {
		try {
			const shopRepository = AppDataSource.getRepository(shopSchema);
			const shops = await shopRepository.find();

			return res.status(200).json({ data: shops });
		} catch (e) {
			return res.status(500).json({ message: "Error fetching shops", error });
		}
	}

	static async create(req, res) {
		try {
			const shopRepository = AppDataSource.getRepository(shopSchema);
			const shop = new Shop();

			await shopRepository.save(shop);

			return res.status(201).json({ data: shop });
		} catch (e) {
			return res.status(500).json({ message: "Error on shop creating" });
		}
	}
}
