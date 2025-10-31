# 🚀 Quick Start Guide - EcoFinds

Get EcoFinds up and running in 5 minutes!

## Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

## Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/ecofinds.git
cd ecofinds

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

## Step 2: Configure Environment

### Server Configuration

Create `server/.env`:

**Option A: Using MongoDB Atlas (Recommended)**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecofinds?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**Option B: Using Local MongoDB**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecofinds
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

> 📘 **Need help with MongoDB Atlas?** See [MONGODB_ATLAS_SETUP.md](MONGODB_ATLAS_SETUP.md) for detailed setup guide.

### Client Configuration

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 3: Seed Database (Optional but Recommended)

### Option A: Realistic Demo Data (Recommended for Hackathon) 🌟
```bash
cd server
node seedDataWithImages.js
```

**Creates:**
- ✅ 4 users with realistic profiles
- ✅ 28 products with Cloudinary images
- ✅ 8 categories (Electronics, Furniture, Clothing, Books, Sports, etc.)
- ✅ Professional product photos
- ✅ Realistic prices and descriptions

**Test Accounts:**
- Email: `rajesh@example.com` | Password: `password123`
- Email: `priya@example.com` | Password: `password123`
- Email: `amit@example.com` | Password: `password123`
- Email: `sneha@example.com` | Password: `password123`

> 💡 **See [DEMO_DATA_GUIDE.md](../DEMO_DATA_GUIDE.md) for complete product list and hackathon demo tips!**

### Option B: Basic Demo Data
```bash
cd server
node seedData.js
```

**Creates:**
- 3 users
- 12 products with Unsplash images

**Test Accounts:**
- Email: `john@example.com` | Password: `password123`
- Email: `jane@example.com` | Password: `password123`
- Email: `mike@example.com` | Password: `password123`

## Step 4: Run the Application

### Terminal 1 - Start Backend

```bash
cd server
npm run dev
```

✅ Server running at `http://localhost:5000`

### Terminal 2 - Start Frontend

```bash
cd client
npm run dev
```

✅ Client running at `http://localhost:3000`

## Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 🎉 You're Ready!

1. **Login** with test credentials or **Sign Up** for a new account
2. **Browse** products on the home page
3. **Add** your own products for sale
4. **Search** and **filter** by category
5. **Add to cart** and **checkout**
6. View your **purchase history**

## 🐛 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running locally
- Or use MongoDB Atlas connection string

### Port Already in Use
- Change PORT in server/.env
- Change port in client/vite.config.js

### CORS Issues
- Ensure VITE_API_URL matches your backend URL
- Check CORS configuration in server/index.js

## 📚 Next Steps

- Read the full [README.md](README.md)
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Explore the API documentation

## 💡 Tips

- Use **Ctrl+C** to stop servers
- Run `npm run dev` for development with hot reload
- Check console for any errors
- Use browser DevTools for debugging

---

**Happy Coding! 🌱**
