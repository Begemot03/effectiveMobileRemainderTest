import { DataSource } from "typeorm";
import OrderSchema from "./entities/orderSchema.js";
import ProductSchema from "./entities/productSchema.js";
import ShopSchema from "./entities/shopSchema.js";
import ProductOrderSchema from "./entities/productOrderSchema.js";
import ProductShopSchema from "./entities/productShopSchema.js";

const DB_HOST = "localhost";
const DB_PORT = 5432;
const DB_USERNAME = "postgres";
const DB_PASSWORD = "Begemot03";
const DB_DATABASE = "effectivemobile1";

const AppDataSource = new DataSource({
	type: "postgres",
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_DATABASE,
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
