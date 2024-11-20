import { EntitySchema } from "typeorm";
import Remainder from "../models/remainder.js";

export default new EntitySchema({
	name: "Remainder",
	tableName: "Remainder",
	target: Remainder,
	columns: {
		remainder_id: {
			primary: true,
			type: "int",
			generated: true,
		},
		product_id: {
			primary: true,
			type: "int",
		},
		shop_id: {
			primary: true,
			type: "int",
		},
		shelf_amount: {
			type: "numeric",
			default: 0,
		},
		order_amount: {
			type: "numeric",
			default: 0,
		},
	},
	relations: {
		product: {
			target: "Product",
			type: "many-to-one",
			joinColumn: {
				name: "product_id",
				referencedColumnName: "product_id",
			},
			onUpdate: "CASCADE",
			inverseSide: "productsRemainder",
		},
		shop: {
			target: "Shop",
			type: "many-to-one",
			joinColumn: {
				name: "shop_id",
				referencedColumnName: "shop_id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
			inverseSide: "productsRemainder",
		},
	},
});
