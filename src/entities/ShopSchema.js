import { EntitySchema } from "typeorm";
import Shop from "../models/Shop.js";

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
		productsShop: {
			target: "ProductShop",
			type: "one-to-many",
			inverseSide: "product",
		},
	},
});
