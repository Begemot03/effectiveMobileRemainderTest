import { EntitySchema } from "typeorm";
import Product from "../models/product.js";

export default new EntitySchema({
	name: "Product",
	tableName: "Product",
	target: Product,
	columns: {
		product_id: {
			primary: true,
			type: "int",
			generated: true,
		},
		plu: {
			type: "varchar",
			length: 12,
		},
		name: {
			type: "varchar",
			length: 255,
		},
	},
	relations: {
		productsRemainder: {
			target: "Remainder",
			type: "one-to-many",
			inverseSide: "product", 
			cascade: true,
		},
	},
});
