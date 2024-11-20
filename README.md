# Краткая информация

В файле .env хранится информация о бд и портах сервисов надо записать информацию для подключения к бд и порты на которых будут открыты сервисы

# Стек

Express + TypeOrm + Postgres

# Для запуска

```
npm run dev
```

# Ендпоинты

## Ендпоинт Product

```
GET /api/product

Query Parameters:
plu
name
limit
offset
```

```
GET /api/product/:product-id

Query Parameters:
plu
name
```

```
POST /api/product

Body:
plu
name
```

## Ендпоинт Shop

```
GET /api/shop
```

```
POST /api/shop
```

## Ендпоинт Remainder

```
GET /api/remainder

Query Parameters:
plu
name
limit
offset
```

```
GET /api/remainder/:remainder-id

Query Parameters:
plu
shelf_min
shelf_max
order_min
order_max
shop_id
```

```
POST /api/remainder

Body:
product_id
shop_id
```

```
PUT /api/remainder/:remainder-id

Body:
amount
place - order or shop
```

# Важно!

Формат plu - ^\d{3}-\d{3}-\d{4}$

Пример: 123-123-1234
