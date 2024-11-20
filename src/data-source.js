import { DataSource } from "typeorm";
import ProductSchema from "./entities/productSchema.js";
import ShopSchema from "./entities/shopSchema.js";
import ProductShopSchema from "./entities/productShopSchema.js";
import RemainderSchema from "./entities/remainderSchema.js";

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
		ShopSchema,
		ProductShopSchema,
		RemainderSchema,
	],
});

export default AppDataSource;
