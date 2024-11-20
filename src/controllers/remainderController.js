import AppDataSource from "../data-source.js";
import ProductSchema from "../entities/productSchema.js";
import RemainderSchema from "../entities/remainderSchema.js";
import ShopSchema from "../entities/shopSchema.js";
import Remainder from "../models/remainder.js";

export default class RemainderController {
	static async all(req, res) {
		try {
			const remainderRepository = AppDataSource.getRepository(RemainderSchema);
			const remainders = await remainderRepository.find();

			return res.status(200).json({ data: remainders });
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Error fetching remainders", error });
		}
	}

	static async get(req, res) {
		try {
			const remainderRepository = AppDataSource.getRepository(RemainderSchema);
			const remainder_id = parseInt(req.params["remainder_id"]);

			if (!Number.isInteger(remainder_id)) {
				return res.status(400).json({ message: "Invalid params" });
			}

			const remainder = await remainderRepository.findOne({
				where: { remainder_id },
                relations: ["shop", "product"]
			});

			if (!remainder) {
				return res.status(404).json({ message: "Remainder not found" });
			}

			return res.status(200).json({ data: remainder });
		} catch (error) {
            console.log(error)
			return res
				.status(500)
				.json({ message: "Error fetching remainders", error });
		}
	}

	static async create(req, res) {
		try {
			const shopRepository = AppDataSource.getRepository(ShopSchema);
			const productRepository = AppDataSource.getRepository(ProductSchema);
			const remainderRepository = AppDataSource.getRepository(RemainderSchema);

			const { product_id, shop_id } = req.body;

			if (!RemainderController.isValidBodyOnCreate(product_id, shop_id)) {
				return res
					.status(400)
					.json({ message: "Product id or Shop id is not corrent" });
			}

			const product = await productRepository.findOne({
				where: { product_id },
			});
			const shop = await shopRepository.findOne({ where: { shop_id } });

			if (product == null || shop == null) {
				return res.status(404).json({ message: "Product or Shop not exist" });
			}

			const remainder = new Remainder();
			remainder.product_id = product.product_id;
			remainder.shop_id = shop.shop_id;

			await remainderRepository.save(remainder);

			return res.status(201).json({ data: remainder });
		} catch (e) {
			return res
				.status(500)
				.json({ message: "Error on create remainder", error });
		}
	}

	static isValidBodyOnCreate(product_id, shop_id) {
		return !isNaN(parseInt(product_id)) && !isNaN(parseInt(shop_id));
	}
}
