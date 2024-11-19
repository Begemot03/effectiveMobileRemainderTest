import { DataSource } from "typeorm";
import OrderSchema from "./entities/OrderSchema.js";
import ProductSchema from "./entities/ProductSchema.js";
import ShopSchema from "./entities/ShopSchema.js";
import ProductOrderSchema from "./entities/ProductOrderSchema.js";
import ProductShopSchema from "./entities/ProductShopSchema.js";

const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "Begemot03",
	database: "effectivemobile1",
	synchronize: true,
	entities: [
        ProductSchema,
		OrderSchema,
		ShopSchema,
		ProductOrderSchema,
		ProductShopSchema,
	],
});

export default AppDataSource;