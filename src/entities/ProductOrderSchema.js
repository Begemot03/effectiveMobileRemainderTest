import { EntitySchema } from "typeorm";
import ProductOrder from "../models/productOrder.js";

export default new EntitySchema({
	name: "ProductOrder",
	tableName: "ProductOrder",
	target: ProductOrder,
	columns: {
		order_id: {
			primary: true,
			type: "int",
		},
		product_id: {
			primary: true,
			type: "int",
		},
		amount: {
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
				referencedColumnName: "product_id",
			},
			onUpdate: "CASCADE",
			inverseSide: "productsOrder",
		},
		order: {
			target: "Order",
			type: "many-to-one",
			joinColumn: {
				name: "order_id",
				referencedColumnName: "order_id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
			inverseSide: "productsOrder",
		},
	},
});
