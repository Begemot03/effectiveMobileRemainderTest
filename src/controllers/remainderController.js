import { LessThanOrEqual, MoreThan, MoreThanOrEqual } from "typeorm";
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
			const filters = RemainderController.getQueryFilters(req.query);
			const options = RemainderController.getQueryOptions(req.query);

			const remainders = await remainderRepository.find({
				where: filters,
				...options,
				relations: ["shop", "product"],
			});

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

	static getQueryFilters(query) {
		const filters = {};

		if (query.plu) {
			filters.plu = query.plu;
		}

		if (query.shop_id) {
			const shopId = parseInt(query.shop_id, 10);
			if (!isNaN(shopId)) {
				filters.shop_id = shopId;
			}
		}

		if (query.shelf_min || query.shelf_max) {
			filters.shelf_amount = {};
			if (query.shelf_min) {
				const shelfMin = parseInt(query.shelf_min, 10);
				if (!isNaN(shelfMin)) {
					filters.shelf_amount = MoreThanOrEqual(shelfMin);
				}
			}
			if (query.shelf_max) {
				const shelfMax = parseInt(query.shelf_max, 10);
				if (!isNaN(shelfMax)) {
					filters.shelf_amount = LessThanOrEqual(shelfMax);
				}
			}
		}

		if (query.order_min || query.order_max) {
			filters.order_amount = {};
			if (query.order_min) {
				const orderMin = parseInt(query.order_min, 10);
				if (!isNaN(orderMin)) {
					filters.order_amount = MoreThanOrEqual(orderMin);
				}
			}
			if (query.order_max) {
				const orderMax = parseInt(query.order_max, 10);
				if (!isNaN(orderMax)) {
					filters.order_amount.$lte = LessThanOrEqual(orderMax);
				}
			}
		}

		return filters;
	}

	static getQueryOptions(query) {
		const options = { skip: 0, take: 10 };

		if (query.limit) {
			const limit = parseInt(query.limit, 10);
			if (!isNaN(limit) && limit > 0) {
				options.take = limit;
			}
		}

		if (query.offset) {
			const offset = parseInt(query.offset, 10);
			if (!isNaN(offset) && offset > 0) {
				options.skip = offset;
			}
		}

		return options;
	}

	static isValidPlace(place) {
		return place == "order" || place == "shop";
	}

	static isValidBodyOnCreate(product_id, shop_id) {
		return !isNaN(parseInt(product_id)) && !isNaN(parseInt(shop_id));
	}
}
