# FarmerConnect Pro API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication Endpoints

### Register User
```http
POST /user/signup
```

**Request Body:**
```json
{
  "fullName": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "userType": "farmer" | "buyer"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "jwt_token",
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string",
    "userType": "string"
  }
}
```

### Login User
```http
POST /user/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "userType": "farmer" | "buyer"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "jwt_token",
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string",
    "userType": "string"
  }
}
```

## Product Endpoints

### Get All Products
```http
GET /products
```

**Query Parameters:**
- `category` (optional): Filter by product category
- `limit` (optional): Number of products per page
- `page` (optional): Page number

**Response:**
```json
{
  "status": "success",
  "results": 10,
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "quantity": "number",
      "category": "string",
      "farmerId": "string"
    }
  ]
}
```

### Create Product
```http
POST /products
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "quantity": "number",
  "category": "string",
  "images": ["string"]
}
```

### Update Product
```http
PUT /products/:id
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "quantity": "number",
  "category": "string"
}
```

### Delete Product
```http
DELETE /products/:id
Authorization: Bearer {token}
```

## Order Endpoints

### Create Order
```http
POST /orders
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "products": [
    {
      "productId": "string",
      "quantity": "number"
    }
  ],
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string"
  }
}
```

### Get User Orders
```http
GET /orders
Authorization: Bearer {token}
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "string",
      "products": [
        {
          "productId": "string",
          "quantity": "number",
          "price": "number"
        }
      ],
      "totalAmount": "number",
      "status": "pending" | "confirmed" | "shipped" | "delivered",
      "createdAt": "date"
    }
  ]
}
```

### Update Order Status
```http
PUT /orders/:id/status
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "confirmed" | "shipped" | "delivered"
}
```

## Error Responses

```json
{
  "status": "error",
  "message": "Error description"
}
```

### Common Error Codes
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `500`: Server Error

## Authentication
All protected routes require a JWT token in the Authorization header:
```http
Authorization: Bearer <your_jwt_token>
```
