# 📂 Project Structure - EcoFinds

Complete directory tree and file organization.

---

## 🌳 Directory Tree

```
EcoFinds/
│
├── 📄 Documentation Files
│   ├── README.md                     # Main documentation
│   ├── QUICKSTART.md                 # Quick setup guide
│   ├── DEPLOYMENT.md                 # Deployment instructions
│   ├── API_DOCUMENTATION.md          # API reference
│   ├── PROJECT_SUMMARY.md            # Project overview
│   ├── STRUCTURE.md                  # This file
│   ├── setup.md                      # Setup commands
│   └── .gitignore                    # Git ignore rules
│
├── 📁 client/                        # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js      # HTTP client config
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Navigation
│   │   │   ├── ProductCard.jsx       # Product card
│   │   │   ├── SearchBar.jsx         # Search input
│   │   │   ├── CategoryFilter.jsx    # Category filter
│   │   │   └── ProtectedRoute.jsx    # Auth wrapper
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Auth state
│   │   ├── pages/
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Signup.jsx            # Register page
│   │   │   ├── Home.jsx              # Product feed
│   │   │   ├── ProductDetail.jsx     # Product view
│   │   │   ├── AddProduct.jsx        # Add product
│   │   │   ├── EditProduct.jsx       # Edit product
│   │   │   ├── MyListings.jsx        # User listings
│   │   │   ├── Cart.jsx              # Shopping cart
│   │   │   ├── Purchases.jsx         # Purchase history
│   │   │   └── Profile.jsx           # User profile
│   │   ├── App.jsx                   # Main component
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── 📁 server/                        # Backend (Node + Express)
    ├── controllers/
    │   ├── authController.js         # Auth logic
    │   ├── userController.js         # User logic
    │   └── productController.js      # Product logic
    ├── models/
    │   ├── User.js                   # User schema
    │   └── Product.js                # Product schema
    ├── routes/
    │   ├── authRoutes.js             # Auth endpoints
    │   ├── userRoutes.js             # User endpoints
    │   └── productRoutes.js          # Product endpoints
    ├── middleware/
    │   └── authMiddleware.js         # JWT verification
    ├── index.js                      # Server entry
    ├── seedData.js                   # DB seeding
    └── package.json
```

---

## 📊 Statistics

- **Total Files:** 40+
- **Frontend Pages:** 9
- **Frontend Components:** 5
- **Backend Controllers:** 3
- **Backend Models:** 2
- **API Routes:** 3
- **Documentation:** 7

---

## 🎯 Quick Reference

### Frontend (React)
- **Pages:** `/client/src/pages/`
- **Components:** `/client/src/components/`
- **Styles:** `/client/src/index.css`
- **Config:** `/client/vite.config.js`

### Backend (Node.js)
- **API Logic:** `/server/controllers/`
- **Database:** `/server/models/`
- **Routes:** `/server/routes/`
- **Entry:** `/server/index.js`

### Documentation
- Setup: `QUICKSTART.md`
- Deploy: `DEPLOYMENT.md`
- API: `API_DOCUMENTATION.md`

---

**This structure follows MERN best practices with clear separation of concerns.**
