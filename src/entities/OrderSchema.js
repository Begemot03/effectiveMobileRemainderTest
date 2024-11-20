import { EntitySchema } from "typeorm";
import Order from "../models/order.js";

export default new EntitySchema({
	name: "Order",
	tableName: "Order",
	target: Order,
	columns: {
		order_id: {
			primary: true,
			type: "int",
			generated: true,
		},
	},
	relations: {
		productsOrder: {
			target: "ProductOrder",
			type: "one-to-many",
			inverseSide: "order",
			cascade: true,
		},
	},
});
