import { EntitySchema } from "typeorm";
import Shop from "../models/shop.js";

export default new EntitySchema({
	name: "Shop",
	tableName: "Shop",
	target: Shop,
	columns: {
		shop_id: {
			primary: true,
			type: "int",
			generated: true,
		},
	},
	relations: {
		productsRemainder: {
			target: "Remainder",
			type: "one-to-many",
			inverseSide: "product",
		},
	},
});
