import "reflect-metadata";
import AppDataSource from "./data-source.js";
import Shop from "./models/Shop.js";
import Order from "./models/Order.js";
import Product from "./models/Product.js";
import ProductOrder from "./models/ProductOrder.js";
import ProductShop from "./models/ProductShop.js";

AppDataSource.initialize()
	.then(async () => {
		// 1. Создаем продукт
		const product = new Product();
		product.plu = "12345";
		product.name = "Sample Product";
		await AppDataSource.getRepository(Product).save(product);
        
        console.log(product);

		// 2. Создаем заказ
		const order = new Order();
		await AppDataSource.getRepository(Order).save(order);

		// Сохраняем связь между заказом и продуктом через ProductOrder
		const productOrder = new ProductOrder();
		productOrder.product_id = product.product_id;
		productOrder.order_id = order.order_id;
		productOrder.amount = 10;
		await AppDataSource.getRepository(ProductOrder).save(productOrder);

	
		const shop = new Shop();
		await AppDataSource.getRepository(Shop).save(shop);

		const productShop = new ProductShop();
		productShop.product_id = product.product_id;
		productShop.shop_id = shop.shop_id;
		productShop.remainder = 10;
		await AppDataSource.getRepository(ProductShop).save(productShop);

		// 4. Вывод всех данных из таблиц
		const allProducts = await AppDataSource.getRepository(Product).find();
		const allOrders = await AppDataSource.getRepository(Order).find();
		const allShops = await AppDataSource.getRepository(Shop).find();
		const allProductOrders = await AppDataSource.getRepository(
			ProductOrder
		).find({ relations: ["product", "order"] });
		const allProductShops = await AppDataSource.getRepository(ProductShop).find(
			{ relations: ["product", "shop"] }
		);

		console.log("Products:");
		console.log(allProducts);

		console.log("Orders:");
		console.log(allOrders);

		console.log("Shops:");
		console.log(allShops);

		console.log("ProductOrders:");
		console.log(allProductOrders);

		console.log("ProductShops:");
		console.log(allProductShops);
	})
	.catch((e) => console.log(e));
