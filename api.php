/**
 * @api {get} /products Get list of products
 * @apiVersion 0.1.0
 * @apiName GetProducts
 * @apiGroup Products
 * 
 * @apiExample Example usage:
 * curl -X GET "https://api.shop.com/v1/products?all=yes"
 *
 * @apiParamExample Request-Example:
 *   {
 *     "all": "yes"
 *   }
 *
 * @apiSuccess {Object} products List of products
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "products": [{
 *     "id": ID1,
 *     "name": "ProductName1",
 *     "id": ID2,
 *     "name": "ProductName2",
 *     "id": ID3,
 *     "name": "ProductName3",
 *     ...
 *   }]
 *   }
 */

/**
 * @api {get} /products Get info of a specific product
 * @apiVersion 0.1.0
 * @apiName ProductInfo
 * @apiGroup Products
 *
 * @apiParam {Number} id Product's id
 *
 * @apiExample Example usage:
 * curl -X GET "https://api.shop.com/v1/products?id=1"
 *
 * @apiParamExample Request-Example:
 *   {
 *     "id": "1"
 *   }
 *
 * @apiSuccess {Object} product Full product info
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "products": [{
 *     "id": 1,
 *     "name": "ProductName",
 *     "description": "ProductDescription",
 *     "balance": "ProductBalance",
 *     "sale": "ProductSale",
 *     "category": "ProductCategory"
 *   }]
 *   }
 *
 * @apiError NotFound Product not found
 *
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 404 NotFound
 *   {
 *     "error": "Product not found"
 *   }
 */

 /**
 * @api {put} /products Change product
 * @apiVersion 0.1.0
 * @apiName ChangeProduct
 * @apiGroup Products
 * @apiPermission admin
 *
 * @apiHeader {String} token User's unique token
 *
 * @apiParam {Number} id Product's id
 * @apiParam {String} [name] Product's name
 * @apiParam {String} [description] Product's description
 * @apiParam {Number} [balance] Product's balance
 * @apiParam {Number} [sale] Product's sale
 * @apiParam {string} [category] Product's category
 *
 * @apiExample Example usage:
 * curl -X PUT -H "TOKEN: b7d03a6947b217efb6f3ec3bd3504582" "https://api.shop.com/v1/products?id=1&sale=30"
 *
 * @apiParamExample Request-Example:
 *   {
 *   "product": [{
 *     "id": 1,
 *     "sale": "30",
 *   }]
 *   }
 *
 * @apiSuccess {Object} product Full product info with changes
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "product": [{
 *     "id": 1,
 *     "name": "ProductName",
 *     "description": "ProductDescription",
 *     "balance": "ProductBalance",
 *     "sale": "30",
 *     "category": "ProductCategory"
 *   }]
 *   }
 *
 * @apiError NoAccessRights Only authenticated admin can change product's params
 *
 * @apiErrorExample 401 Error-response:
 *   HTTP/1.1 401 Non Authenticated
 *   {
 *   "error": "Not Allowed"
 *   }
 *
 * @apiError NotFound Wrong or missed product's id
 *
 * @apiErrorExample 404 Error-Response:
 *   HTTP/1.1 404 NotFound
 *   {
 *     "error": "Product not found"
 *   }

 */

 /**
 * @api {post} /orders/ Create order
 * @apiVersion 0.1.0
 * @apiName CreateOrder
 * @apiGroup Orders
 *
 * @apiHeader {String} token User's unique token
 *
 * @apiParam {String} address Delivery address
 * @apiParam {String} payment Payment method
 * @apiParam {Object} order List of products
 *
 * @apiExample Example usage:
 * curl -X POST -H "X_API_TOKEN: b7d03a6947b217efb6f3ec3bd3504582" -d '{"address":"Address","payment":"Card","order":[{"id":"1","amount":"1"},{"id":"2","amount":"1"}]} "https://api.shop.com/v1/orders"
 *
 * @apiParamExample Request-Example:
 *   {
 *     "address": "Address",
 *     "payment": "Card",
 *     "order": [
 *       {
 *         "id": "1",
 *         "amount": "1"
 *       },
 *       {
 *         "id": "2",
 *         "amount": "1"
 *       }
 *     ]
 *   }
 *
 * @apiSuccess {Number} id ID of new order 
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": "ID"
 *   }
 * 
 * @apiError BadRequest Wrong or missed input data
 *
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   {
 *   "error": "Bad request"
 *   }
 */
