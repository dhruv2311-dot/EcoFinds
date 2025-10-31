# 📚 API Documentation - EcoFinds

Complete API reference for the EcoFinds backend.

**Base URL:** `http://localhost:5000/api` (Development)  
**Production URL:** `https://your-api.onrender.com/api`

---

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 Table of Contents

1. [Authentication Routes](#authentication-routes)
2. [User Routes](#user-routes)
3. [Product Routes](#product-routes)
4. [Error Responses](#error-responses)
5. [Data Models](#data-models)

---

## Authentication Routes

### Register User

Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation:**
- `username`: min 3 characters
- `email`: valid email format
- `password`: min 6 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f7a8b9c1234567890abcde",
    "username": "johndoe",
    "email": "john@example.com",
    "profilePic": "https://via.placeholder.com/150"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

### Login User

Authenticate and receive a JWT token.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f7a8b9c1234567890abcde",
    "username": "johndoe",
    "email": "john@example.com",
    "profilePic": "https://via.placeholder.com/150"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## User Routes

All user routes require authentication.

### Get User Profile

Get user profile information.

**Endpoint:** `GET /api/users/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "64f7a8b9c1234567890abcde",
    "username": "johndoe",
    "email": "john@example.com",
    "profilePic": "https://via.placeholder.com/150",
    "cart": [],
    "purchased": [],
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Update User Profile

Update user profile information.

**Endpoint:** `PUT /api/users/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "username": "johndoe_updated",
  "profilePic": "https://example.com/new-avatar.jpg"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "64f7a8b9c1234567890abcde",
    "username": "johndoe_updated",
    "email": "john@example.com",
    "profilePic": "https://example.com/new-avatar.jpg"
  }
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to update this profile"
}
```

---

### Get User's Cart

Get all items in user's cart.

**Endpoint:** `GET /api/users/:id/cart`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "cart": [
    {
      "_id": "64f7a8b9c1234567890abcdf",
      "title": "iPhone 12 Pro",
      "description": "Excellent condition...",
      "category": "Electronics",
      "price": 45000,
      "image": "https://example.com/image.jpg",
      "owner": {
        "_id": "64f7a8b9c1234567890abce0",
        "username": "seller1",
        "email": "seller@example.com"
      }
    }
  ]
}
```

---

### Add to Cart

Add a product to user's cart.

**Endpoint:** `POST /api/users/:id/cart`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "productId": "64f7a8b9c1234567890abcdf"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product added to cart",
  "cart": [...]
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Product already in cart"
}
```

---

### Remove from Cart

Remove a product from user's cart.

**Endpoint:** `DELETE /api/users/:id/cart/:productId`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product removed from cart",
  "cart": [...]
}
```

---

### Checkout / Purchase

Complete purchase of all items in cart.

**Endpoint:** `POST /api/users/:id/purchase`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Purchase successful",
  "purchased": [...]
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Cart is empty"
}
```

---

### Get Purchase History

Get all previously purchased items.

**Endpoint:** `GET /api/users/:id/purchases`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "purchases": [
    {
      "_id": "64f7a8b9c1234567890abcdf",
      "title": "iPhone 12 Pro",
      "price": 45000,
      "category": "Electronics",
      "image": "https://example.com/image.jpg"
    }
  ]
}
```

---

## Product Routes

### Get All Products

Get all products with optional filters.

**Endpoint:** `GET /api/products`

**Query Parameters:**
- `search` (optional): Search term for title/description
- `category` (optional): Filter by category

**Examples:**
```
GET /api/products
GET /api/products?search=iphone
GET /api/products?category=Electronics
GET /api/products?search=phone&category=Electronics
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 12,
  "products": [
    {
      "_id": "64f7a8b9c1234567890abcdf",
      "title": "iPhone 12 Pro",
      "description": "Excellent condition...",
      "category": "Electronics",
      "price": 45000,
      "image": "https://example.com/image.jpg",
      "sold": false,
      "owner": {
        "_id": "64f7a8b9c1234567890abce0",
        "username": "seller1",
        "email": "seller@example.com",
        "profilePic": "https://example.com/avatar.jpg"
      },
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### Get Single Product

Get detailed information about a specific product.

**Endpoint:** `GET /api/products/:id`

**Success Response (200):**
```json
{
  "success": true,
  "product": {
    "_id": "64f7a8b9c1234567890abcdf",
    "title": "iPhone 12 Pro",
    "description": "Excellent condition...",
    "category": "Electronics",
    "price": 45000,
    "image": "https://example.com/image.jpg",
    "sold": false,
    "owner": {
      "_id": "64f7a8b9c1234567890abce0",
      "username": "seller1",
      "email": "seller@example.com",
      "profilePic": "https://example.com/avatar.jpg"
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### Get Products by Owner

Get all products listed by a specific user.

**Endpoint:** `GET /api/products/user/:userId`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "products": [...]
}
```

---

### Create Product

Create a new product listing.

**Endpoint:** `POST /api/products`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "iPhone 12 Pro - Excellent Condition",
  "description": "Gently used iPhone 12 Pro, 128GB...",
  "category": "Electronics",
  "price": 45000,
  "image": "https://example.com/image.jpg"
}
```

**Validation:**
- `title`: min 3 characters
- `description`: min 10 characters
- `category`: must be one of the predefined categories
- `price`: must be a positive number
- `image`: optional, defaults to placeholder

**Success Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "_id": "64f7a8b9c1234567890abcdf",
    "title": "iPhone 12 Pro - Excellent Condition",
    "description": "Gently used iPhone 12 Pro, 128GB...",
    "category": "Electronics",
    "price": 45000,
    "image": "https://example.com/image.jpg",
    "sold": false,
    "owner": {
      "_id": "64f7a8b9c1234567890abce0",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Update Product

Update an existing product (owner only).

**Endpoint:** `PUT /api/products/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "iPhone 12 Pro - Updated Title",
  "price": 42000
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": {...}
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to update this product"
}
```

---

### Delete Product

Delete a product (owner only).

**Endpoint:** `DELETE /api/products/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to delete this product"
}
```

---

## Error Responses

### Common Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

### Error Response Format

```json
{
  "success": false,
  "message": "Error description"
}
```

### Validation Error Format

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Username must be at least 3 characters",
      "param": "username",
      "location": "body"
    }
  ]
}
```

---

## Data Models

### User Model

```javascript
{
  _id: ObjectId,
  username: String (min: 3),
  email: String (unique, lowercase),
  password: String (hashed),
  profilePic: String (URL),
  cart: [ObjectId] (ref: Product),
  purchased: [ObjectId] (ref: Product),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model

```javascript
{
  _id: ObjectId,
  title: String (min: 3),
  description: String (min: 10),
  category: String (enum),
  price: Number (min: 0),
  image: String (URL),
  owner: ObjectId (ref: User),
  sold: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Categories

- Electronics
- Furniture
- Clothing
- Books
- Sports
- Home & Garden
- Toys
- Other

---

## Rate Limiting

Currently, there are no rate limits implemented. For production, consider implementing rate limiting using `express-rate-limit`.

---

## Pagination

Pagination is not currently implemented. All products are returned in a single response. For production with large datasets, implement pagination:

```
GET /api/products?page=1&limit=20
```

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Create Product (with auth)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Test Product","description":"Test description here","category":"Electronics","price":5000}'
```

---

## Testing with Postman

1. Import the API endpoints into Postman
2. Create an environment with:
   - `base_url`: `http://localhost:5000/api`
   - `token`: (set after login)
3. Use `{{base_url}}` and `{{token}}` in requests

---

## WebSocket Support

WebSocket support is not currently implemented. For real-time features (chat, notifications), consider adding Socket.io.

---

## API Versioning

Current API version: **v1** (implicit)

For future versions, consider:
```
/api/v1/products
/api/v2/products
```

---

## Support

For API issues or questions:
- Check server logs
- Review this documentation
- Open an issue on GitHub

---

**Last Updated:** January 2025  
**API Version:** 1.0.0
