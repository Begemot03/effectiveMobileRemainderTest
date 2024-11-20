import { DataSource } from "typeorm";
import ProductSchema from "./entities/productSchema.js";
import ShopSchema from "./entities/shopSchema.js";
import ProductShopSchema from "./entities/productShopSchema.js";
import RemainderSchema from "./entities/remainderSchema.js";
import "dotenv/config";

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

const AppDataSource = new DataSource({
	type: "postgres",
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	synchronize: true,
	entities: [ProductSchema, ShopSchema, ProductShopSchema, RemainderSchema],
});

export default AppDataSource;
