import { EntitySchema } from "typeorm";
import ProductShop from "../models/productShop.js";

export default new EntitySchema({
	name: "ProductShop",
	tableName: "ProductShop",
	target: ProductShop,
	columns: {
		product_id: {
			primary: true,
			type: "int",
		},
		shop_id: {
			primary: true,
			type: "int",
		},
		remainder: {
			type: "numeric",
			default: 1,
		},
	},
	relations: {
		product: {
			target: "Product",
			type: "many-to-one",
			joinColumn: {
				name: "product_id",
				referencedColumn: "product_id",
			},
			onUpdate: "CASCADE",
			inverseSide: "productsShop",
		},
		shop: {
			target: "Shop",
			type: "many-to-one",
			joinColumn: {
				name: "shop_id",
				referencedColumn: "shop_id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
			inverseSide: "productsShop",
		},
	},
});
