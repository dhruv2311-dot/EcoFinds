# 🌱 EcoFinds - Sustainable Second-Hand Marketplace

![EcoFinds Banner](https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&h=300&fit=crop)

**EcoFinds** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce platform that promotes sustainable consumption by enabling users to buy and sell pre-owned products easily and securely.

Built for **Odoo x NMIT Hackathon 2025** 🏆

---

## 💡 Project Overview

EcoFinds addresses the growing need for sustainable consumption by providing a digital marketplace where users can:

- ♻️ **Buy & sell** second-hand items
- 🌍 **Extend product lifecycles** and reduce waste
- 🤝 **Build a conscious, eco-friendly community**
- 💚 **Promote circular economy** principles

---

## 🎯 Core Features

### ✅ User Authentication
- Register and login with email and password
- JWT-based secure authentication
- Password hashing with bcrypt
- Input validation

### 👤 User Profile Management
- View and edit profile (username, profile picture)
- Account information dashboard
- Logout functionality

### 📦 Product Listing (CRUD)
- Add products with title, description, category, price, and image
- Edit or delete your own listings
- View all product listings in a responsive grid

### 🔍 Product Browsing
- Browse all available products
- Filter by category (Electronics, Furniture, Clothing, etc.)
- Search by keyword in product title/description
- Responsive card-based layout

### 🛒 Shopping Cart
- Add products to cart
- Remove items from cart
- View cart summary with total price
- Checkout functionality

### 📜 Purchase History
- View previously purchased items
- Purchase statistics and analytics
- Order history tracking

### 🎨 Modern UI/UX
- Dark theme with emerald green accents
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Toast notifications for user feedback

---

## 🧱 Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt.js** - Password hashing
- **CORS** - Cross-origin resource sharing

---

## 📁 Project Structure

```
EcoFinds/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context (Auth)
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                # Backend Node.js application
│   ├── controllers/       # Request handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── index.js          # Server entry point
│   ├── seedData.js       # Database seeding script
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB Atlas** (recommended) or **Local MongoDB**
- **npm** or **yarn**

> 💡 **Using MongoDB Atlas?** Follow our [MongoDB Atlas Setup Guide](MONGODB_ATLAS_SETUP.md) for step-by-step instructions.

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ecofinds.git
cd ecofinds
```

#### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

**Using MongoDB Atlas (Recommended):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecofinds?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

**Using Local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecofinds
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

> 📘 See [MONGODB_ATLAS_SETUP.md](MONGODB_ATLAS_SETUP.md) for detailed MongoDB Atlas configuration.

#### 3. Setup Frontend

```bash
cd ../client
npm install
```

#### 4. Seed Database (Recommended)

**Option A: Realistic Demo Data (Best for Hackathon)** 🌟
```bash
cd server
node seedDataWithImages.js
```

Creates 28 realistic products with Cloudinary images across 8 categories.

**Test Credentials:**
- Email: `rajesh@example.com` | Password: `password123`
- Email: `priya@example.com` | Password: `password123`
- Email: `amit@example.com` | Password: `password123`

> 📘 See [DEMO_DATA_GUIDE.md](DEMO_DATA_GUIDE.md) for complete product list!

**Option B: Basic Demo Data**
```bash
cd server
node seedData.js
```

Creates 12 basic products with Unsplash images.

**Test Credentials:**
- Email: `john@example.com` | Password: `password123`
- Email: `jane@example.com` | Password: `password123`

---

## 🏃‍♂️ Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Client runs on `http://localhost:3000`

### Production Build

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

---

## 🛠️ API Endpoints

### Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### User Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/:id` | Get user profile |
| PUT | `/api/users/:id` | Update profile |
| GET | `/api/users/:id/cart` | Get user's cart |
| POST | `/api/users/:id/cart` | Add to cart |
| DELETE | `/api/users/:id/cart/:productId` | Remove from cart |
| POST | `/api/users/:id/purchase` | Checkout |
| GET | `/api/users/:id/purchases` | Get purchases |

### Product Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products/user/:userId` | Get user's listings |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

---

## 🎨 UI Design

### Color Scheme
- **Background:** `#0a0a0a` (Dark)
- **Card Background:** `#1a1a1a`
- **Border:** `#2a2a2a`
- **Primary (Accent):** `#4ade80` (Emerald Green)
- **Text:** White / Off-white

### Typography
- **Font Family:** Inter (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700

### Components
- Minimalist dark theme
- Card-based product layout
- Responsive navigation bar
- Toast notifications
- Loading spinners
- Form inputs with icons

---

## 📱 Responsive Design

EcoFinds is fully responsive and works seamlessly on:
- 📱 **Mobile** (320px - 767px)
- 📱 **Tablet** (768px - 1023px)
- 💻 **Desktop** (1024px+)

---

## 🔐 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Environment variables for sensitive data

---

## 🚢 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=your_backend_url`

### Backend (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables (PORT, MONGODB_URI, JWT_SECRET)

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in environment variables

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Profile update
- [ ] Add product listing
- [ ] Edit product listing
- [ ] Delete product listing
- [ ] Search products
- [ ] Filter by category
- [ ] Add to cart
- [ ] Remove from cart
- [ ] Checkout process
- [ ] View purchase history
- [ ] Responsive design on mobile/tablet

---

## 🌟 Future Enhancements

- 💬 **Chat System** - Real-time messaging between buyers and sellers
- ⭐ **Rating & Reviews** - Product and seller ratings
- 🏷️ **Product Condition Tags** - "Like New", "Good", "Fair" labels
- 🌱 **Sustainability Score** - Eco-impact metrics per product
- 📧 **Email Notifications** - Order confirmations and updates
- 🔔 **Push Notifications** - Real-time alerts
- 📊 **Analytics Dashboard** - Sales and purchase insights
- 🎯 **Recommendations** - AI-powered product suggestions
- 📄 **Pagination** - Infinite scroll for products
- 🖼️ **Image Upload** - Cloudinary integration
- 🌐 **Multi-language Support** - i18n implementation

---

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Odoo x NMIT Hackathon 2025** for the opportunity
- **Unsplash** for product images
- **Lucide** for beautiful icons
- **Tailwind CSS** for styling utilities
- Open source community for amazing tools

---

## 📞 Contact

**Project Maintainer:** Your Name

- 📧 Email: your.email@example.com
- 🐙 GitHub: [@yourusername](https://github.com/yourusername)
- 💼 LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

---

## 🌍 Live Demo

🔗 **Frontend:** [https://ecofinds.vercel.app](https://ecofinds.vercel.app)  
🔗 **Backend API:** [https://ecofinds-api.render.com](https://ecofinds-api.render.com)

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Made with 💚 for a sustainable future**

</div>
