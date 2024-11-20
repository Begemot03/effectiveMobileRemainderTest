import productSchema from "../entities/productSchema.js";
import historyApi from "../helpers/historyApi.js";
import Product from "../models/product.js";
import BaseController from "./baseController.js";


export default class ProductController extends BaseController {
	static async all(req, res) {
		try {
			const productRepository = ProductController.getRepository(productSchema);
			const filters = ProductController.getQueryFiltres(req.query);
			const options = ProductController.getQueryOptions(req.query);

			const products = await productRepository.find({
				where: filters,
				...options,
			});

			return res.status(200).json({ data: products });
		} catch (error) {
			return ProductController.handleError(
				res,
				"Error fetching products",
				error,
				500
			);
		}
	}

	static async get(req, res) {
		try {
			const productRepository = ProductController.getRepository(productSchema);
			const id = ProductController.validateInteger(req.params["id"], "id");
			const filters = { id, ...ProductController.getQueryFiltres(req.query) };

			const product = await productRepository.findOne({ where: filters });

			if (!product) {
				return res.status(404).json({ message: "Product not found" });
			}

			return res.status(200).json({ data: product });
		} catch (error) {
			return ProductController.handleError(
				res,
				"Error fetching product",
				error,
				500
			);
		}
	}

	static async create(req, res) {
		const plu = ProductController.validateString(req.body.plu, "PLU");
		const name = ProductController.validateString(req.body.name, "Name");

		if (!ProductController.isValidPlu(plu)) {
			return res.status(400).json({ message: "Invalid PLU format" });
		}

		try {
			const productRepository = AppDataSource.getRepository(productSchema);

			const isProductExistByPlu = await productRepository.findOne({
				where: { plu },
			});

			if (isProductExistByPlu) {
				return res
					.status(400)
					.json({ message: "Product with this PLU already exists" });
			}

			const product = new Product();
			product.name = name;
			product.plu = plu;

			await productRepository.save(product);
			await historyApi("/product", { action: "CREATE", ...product });

			return res.status(201).json({ data: product });
		} catch (error) {
			return ProductController.handleError(
				res,
				"Error on create product",
				error,
				500
			);
		}
	}

	static getQueryFiltres(query) {
		const filters = {};

		if (query.plu && ProductController.isValidPlu(query.plu)) {
			filters.plu = query.plu;
		}
		if (query.name) {
			filters.name = query.name;
		}

		return filters;
	}

	static isValidPlu(plu) {
		const reg = /^\d{3}-\d{3}-\d{4}$/;
		return reg.test(plu);
	}

	static convertParamNameToBasicName(name) {
		return name.replaceAll("_", " ");
	}
}
