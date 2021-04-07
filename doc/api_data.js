define({ "api": [
  {
    "type": "post",
    "url": "/orders/",
    "title": "Create order",
    "version": "0.1.0",
    "name": "CreateOrder",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User's unique token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Delivery address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "payment",
            "description": "<p>Payment method</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "order",
            "description": "<p>List of products</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"address\": \"Address\",\n  \"payment\": \"Card\",\n  \"order\": [\n    {\n      \"id\": \"1\",\n      \"amount\": \"1\"\n    },\n    {\n      \"id\": \"2\",\n      \"amount\": \"1\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X POST -H \"X_API_TOKEN: b7d03a6947b217efb6f3ec3bd3504582\" -d '{\"address\":\"Address\",\"payment\":\"Card\",\"order\":[{\"id\":\"1\",\"amount\":\"1\"},{\"id\":\"2\",\"amount\":\"1\"}]} \"https://api.shop.com/v1/orders\"",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of new order</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"ID\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Wrong or missed input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\"error\": \"Bad request\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.php",
    "groupTitle": "Orders"
  },
  {
    "type": "put",
    "url": "/products",
    "title": "Change product",
    "version": "0.1.0",
    "name": "ChangeProduct",
    "group": "Products",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User's unique token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Product's id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Product's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Product's description</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "balance",
            "description": "<p>Product's balance</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "sale",
            "description": "<p>Product's sale</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "category",
            "description": "<p>Product's category</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\"product\": [{\n  \"id\": 1,\n  \"sale\": \"30\",\n}]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X PUT -H \"TOKEN: b7d03a6947b217efb6f3ec3bd3504582\" \"https://api.shop.com/v1/products?id=1&sale=30\"",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>Full product info with changes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"product\": [{\n  \"id\": 1,\n  \"name\": \"ProductName\",\n  \"description\": \"ProductDescription\",\n  \"balance\": \"ProductBalance\",\n  \"sale\": \"30\",\n  \"category\": \"ProductCategory\"\n}]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRights",
            "description": "<p>Only authenticated admin can change product's params</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Wrong or missed product's id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "401 Error-response:",
          "content": "HTTP/1.1 401 Non Authenticated\n{\n\"error\": \"Not Allowed\"\n}",
          "type": "json"
        },
        {
          "title": "404 Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n  \"error\": \"Product not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.php",
    "groupTitle": "Products"
  },
  {
    "type": "get",
    "url": "/products",
    "title": "Get list of products",
    "version": "0.1.0",
    "name": "GetProducts",
    "group": "Products",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET \"https://api.shop.com/v1/products?all=yes\"",
        "type": "json"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"all\": \"yes\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "products",
            "description": "<p>List of products</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"products\": [{\n  \"id\": ID1,\n  \"name\": \"ProductName1\",\n  \"id\": ID2,\n  \"name\": \"ProductName2\",\n  \"id\": ID3,\n  \"name\": \"ProductName3\",\n  ...\n}]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.php",
    "groupTitle": "Products"
  },
  {
    "type": "get",
    "url": "/products",
    "title": "Get info of a specific product",
    "version": "0.1.0",
    "name": "ProductInfo",
    "group": "Products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Product's id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET \"https://api.shop.com/v1/products?id=1\"",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>Full product info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"products\": [{\n  \"id\": 1,\n  \"name\": \"ProductName\",\n  \"description\": \"ProductDescription\",\n  \"balance\": \"ProductBalance\",\n  \"sale\": \"ProductSale\",\n  \"category\": \"ProductCategory\"\n}]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Product not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n  \"error\": \"Product not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.php",
    "groupTitle": "Products"
  }
] });