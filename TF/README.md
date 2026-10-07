# Product Inventory API

A CRUD API for tracking warehouse products, built with Node.js, Express, and MongoDB Atlas (via Mongoose), organized into models/controllers/routes.

## Structure

```
backend/
├── models/
│   └── item.js            <-- Mongoose Schema & Model (Product)
├── controllers/
│   └── itemController.js  <-- Business logic / async functions
├── routes/
│   └── itemRoutes.js      <-- Express Router endpoints
└── server.js               <-- Entry point (App config, DB connection, Middleware)
```

> Note: the exercise asks for a `Product` resource, so the model/collection is still named `Product` internally — only the file names follow the `item*` convention shown above.

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your MongoDB Atlas connection string:
   ```
   cp .env.example .env
   ```
   Replace `<username>`, `<password>`, and `<cluster-url>`. The database name (`inventory_db`) is already in the URI path.
3. Start the server:
   ```
   npm start
   ```
   You should see `✅ Connected to MongoDB Atlas (inventory_db)` and `🚀 Server running on http://localhost:3000`.

## Product Schema (models/item.js)

| Field     | Type    | Required | Default    | Notes                                  |
|-----------|---------|----------|------------|-----------------------------------------|
| name      | String  | Yes      | —          | Error: "Product name is required"       |
| price     | Number  | Yes      | —          | Must be a positive number               |
| inStock   | Boolean | No       | `true`     |                                          |
| createdAt | Date    | No       | `Date.now` |                                          |

## Endpoints (routes/itemRoutes.js → controllers/itemController.js)

| Method | Route                  | Controller function | Success Status |
|--------|------------------------|----------------------|-----------------|
| POST   | `/api/products`        | `createProduct`      | 201             |
| GET    | `/api/products`        | `getAllProducts`     | 200             |
| GET    | `/api/products/:id`    | `getProductById`     | 200             |
| PUT    | `/api/products/:id`    | `updateProduct`      | 200             |
| DELETE | `/api/products/:id`    | `deleteProduct`      | 200             |

Error responses use `400` (bad input / invalid ID), `404` (not found), or `500` (server error).

## Testing in Postman

1. **Create (POST)** — `http://localhost:3000/api/products`
   Body (raw JSON):
   ```json
   { "name": "Wireless Mouse", "price": 19.99 }
   ```
   Copy the `_id` from the response for the next steps.

2. **Get all (GET)** — `http://localhost:3000/api/products`

3. **Get one (GET)** — `http://localhost:3000/api/products/<id>`

4. **Update (PUT)** — `http://localhost:3000/api/products/<id>`
   Body (raw JSON):
   ```json
   { "price": 24.99 }
   ```

5. **Delete (DELETE)** — `http://localhost:3000/api/products/<id>`

Confirm in MongoDB Atlas (Collections view) that the `products` collection in `inventory_db` reflects each change.
