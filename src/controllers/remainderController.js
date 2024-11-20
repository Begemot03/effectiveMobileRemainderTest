import AppDataSource from "../data-source.js";
import ProductSchema from "../entities/productSchema.js";
import RemainderSchema from "../entities/remainderSchema.js";
import ShopSchema from "../entities/shopSchema.js";
import Remainder from "../models/remainder.js";
import BaseController from "./baseController.js";

export default class RemainderController extends BaseController {
	static async all(req, res) {
		try {
			const remainderRepository =
				RemainderController.getRepository(RemainderSchema);
			const remainders = await remainderRepository.find();

			return res.status(200).json({ data: remainders });
		} catch (error) {
			return RemainderController.handleError(
				res,
				"Error fetching remainders",
				500
			);
		}
	}

	static async get(req, res) {
		try {
			const remainderRepository =
				RemainderController.getRepository(RemainderSchema);
			const remainder_id = RemainderController.validateInteger(
				req.params["remainder_id"],
				"remainder_id"
			);

			const remainder = await remainderRepository.findOne({
				where: { remainder_id },
				relations: ["shop", "product"],
			});

			if (!remainder) {
				return res.status(404).json({ message: "Remainder not found" });
			}

			return res.status(200).json({ data: remainder });
		} catch (error) {
			return RemainderController.handleError(
				res,
				"Error fetching remainder",
				500
			);
		}
	}

	static async create(req, res) {
		try {
			const shopRepository = RemainderController.getRepository(ShopSchema);
			const productRepository =
				RemainderController.getRepository(ProductSchema);
			const remainderRepository =
				RemainderController.getRepository(RemainderSchema);

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

			if (!product || !shop) {
				return res.status(404).json({ message: "Product or Shop not found" });
			}

			const remainder = new Remainder();
			remainder.product_id = product.product_id;
			remainder.shop_id = shop.shop_id;

			await remainderRepository.save(remainder);

			return res.status(201).json({ data: remainder });
		} catch (e) {
			return RemainderController.handleError(
				res,
				"Error creating remainder",
				error
			);
		}
	}

	static async update(req, res) {
		try {
			const remainderRepository =
				RemainderController.getRepository(RemainderSchema);
			const remainder_id = RemainderController.validateInteger(
				req.params["remainder_id"],
				"remainder_id"
			);
			const place = req.query.place;
			const amount = RemainderController.validateInteger(
				req.query.amount,
				"amount"
			);

			if (!place || !RemainderController.isValidPlace(place)) {
				return res.status(400).json({ message: "Invalid place value" });
			}

			const remainder = await remainderRepository.findOne({
				where: { remainder_id },
				relations: ["shop", "product"],
			});

			if (!remainder) {
				return res.status(404).json({ message: "Remainder not found" });
			}

			if (place === "order") {
				remainder.order_amount = (remainder.order_amount || 0) + amount;
			} else if (place === "shop") {
				remainder.shelf_amount = (remainder.shelf_amount || 0) + amount;
			}

			await remainderRepository.save(remainder);

			return res.status(200).json({ data: remainder });
		} catch (error) {
			return RemainderController.handleError(
				res,
				"Error fetching remainders",
				500
			);
		}
	}

	static isValidPlace(place) {
		return place == "order" || place == "shop";
	}

	static isValidBodyOnCreate(product_id, shop_id) {
		return !isNaN(parseInt(product_id)) && !isNaN(parseInt(shop_id));
	}
}
