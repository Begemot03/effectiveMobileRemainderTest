import AppDataSource from "../data-source.js";
import productSchema from "../entities/productSchema.js";
import Product from "../models/product.js";
import BaseController from "./baseController.js";

export default class ProductController extends BaseController {
	static async all(req, res) {
		try {
			const productRepository = ProductController.getRepository(productSchema);
			const products = await productRepository.find();

			return res.status(200).json({ data: products });
		} catch (error) {
			return ProductController.handleError(res, "Error fetching products", 500);
		}
	}

	static async get(req, res) {
		try {
			const filter = ProductController.validateString(
				req.params["filter"],
				"filter"
			);
			const id = parseInt(filter, 10);
			let query = {};

			if (ProductController.isValidPlu(filter)) {
				query = { plu: filter };
			} else if (!isNaN(id)) {
				query = { product_id: id };
			} else {
				query = { name: ProductController.convertParamNameToBasicName(filter) };
			}

			await ProductController.getBy(query, req, res);
		} catch (error) {
			return ProductController.handleError(res, "Error fetching product", 500);
		}
	}

	static async getBy(filter, req, res) {
		try {
			const productRepository = ProductController.getRepository(productSchema);
			const product = await productRepository.findOne({ where: filter });

			if (!product) {
				return res.status(404).json({ message: "Product not found" });
			}

			return res.status(200).json({ data: product });
		} catch (error) {
			return res.status(500).json({ message: "Error fetching product", error });
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

			return res.status(201).json({ data: product });
		} catch (error) {
			return ProductController.handleError(res, "Error on create product", 500);
		}
	}

	static isValidPlu(plu) {
		const reg = /^\d{3}-\d{3}-\d{4}$/;
		return reg.test(plu);
	}

	static convertParamNameToBasicName(name) {
		return name.replaceAll("_", " ");
	}
}
