# 🔧 Setup Commands - EcoFinds

Quick reference for setting up and running EcoFinds.

---

## 📦 Initial Setup

### 1. Install Server Dependencies
```powershell
cd server
npm install
```

### 2. Install Client Dependencies
```powershell
cd client
npm install
```

### 3. Create Environment Files

**Server (.env):**
```powershell
cd server
echo PORT=5000 > .env
echo MONGODB_URI=mongodb://localhost:27017/ecofinds >> .env
echo JWT_SECRET=your_secret_key_change_this >> .env
echo NODE_ENV=development >> .env
```

**Client (.env):**
```powershell
cd client
echo VITE_API_URL=http://localhost:5000/api > .env
```

### 4. Seed Database (Optional)
```powershell
cd server
node seedData.js
```

---

## 🚀 Running the Application

### Option 1: Two Terminals

**Terminal 1 - Backend:**
```powershell
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd client
npm run dev
```

### Option 2: Production Mode

**Backend:**
```powershell
cd server
npm start
```

**Frontend:**
```powershell
cd client
npm run build
npm run preview
```

---

## 🧪 Testing

### Access the Application
```
http://localhost:3000
```

### Test API Health
```
http://localhost:5000
```

### Test Credentials
```
Email: john@example.com
Password: password123
```

---

## 🛠️ Common Commands

### Install Dependencies
```powershell
# Server
cd server
npm install

# Client
cd client
npm install
```

### Start Development Servers
```powershell
# Server (with nodemon)
cd server
npm run dev

# Client (with hot reload)
cd client
npm run dev
```

### Build for Production
```powershell
# Client
cd client
npm run build
```

### Clean Install
```powershell
# Remove node_modules and reinstall
cd server
Remove-Item -Recurse -Force node_modules
npm install

cd ../client
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 🗄️ MongoDB Commands

### Start MongoDB (Windows)
```powershell
# If MongoDB is installed as a service
net start MongoDB

# Or run manually
mongod
```

### Connect to MongoDB
```powershell
mongosh
```

### View Database
```javascript
use ecofinds
db.users.find()
db.products.find()
```

### Clear Database
```javascript
use ecofinds
db.users.deleteMany({})
db.products.deleteMany({})
```

---

## 🔍 Debugging

### Check Server Logs
```powershell
cd server
npm run dev
# Watch console output
```

### Check Client Logs
```powershell
cd client
npm run dev
# Open browser console (F12)
```

### Test API Endpoints
```powershell
# Using curl (if installed)
curl http://localhost:5000/api/products

# Or use browser
# Navigate to: http://localhost:5000/api/products
```

---

## 📝 Git Commands

### Initialize Repository
```powershell
git init
git add .
git commit -m "Initial commit: EcoFinds MERN app"
```

### Create GitHub Repository
```powershell
git remote add origin https://github.com/yourusername/ecofinds.git
git branch -M main
git push -u origin main
```

### Update Repository
```powershell
git add .
git commit -m "Your commit message"
git push
```

---

## 🚢 Deployment Commands

### Build Client
```powershell
cd client
npm run build
```

### Test Production Build Locally
```powershell
cd client
npm run preview
```

### Deploy to Vercel (Client)
```powershell
cd client
npm install -g vercel
vercel
```

### Deploy to Render (Server)
```powershell
# Push to GitHub first
git push

# Then deploy via Render dashboard
# Or use Render CLI
```

---

## 🧹 Cleanup Commands

### Remove Build Files
```powershell
cd client
Remove-Item -Recurse -Force dist
```

### Remove Node Modules
```powershell
Remove-Item -Recurse -Force server/node_modules
Remove-Item -Recurse -Force client/node_modules
```

### Remove Environment Files
```powershell
Remove-Item server/.env
Remove-Item client/.env
```

---

## 📊 Package Management

### Update Dependencies
```powershell
# Server
cd server
npm update

# Client
cd client
npm update
```

### Check for Outdated Packages
```powershell
npm outdated
```

### Install Specific Package
```powershell
# Server
cd server
npm install package-name

# Client
cd client
npm install package-name
```

---

## 🔐 Security

### Generate New JWT Secret
```powershell
# In PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString()))
```

### Update JWT Secret
```powershell
# Edit server/.env
# Change JWT_SECRET value
```

---

## 📱 Mobile Testing

### Access from Mobile Device

1. Find your computer's IP address:
```powershell
ipconfig
# Look for IPv4 Address
```

2. Update client Vite config to allow network access:
```javascript
// vite.config.js
server: {
  host: '0.0.0.0',
  port: 3000
}
```

3. Access from mobile:
```
http://YOUR_IP_ADDRESS:3000
```

---

## 🆘 Troubleshooting

### Port Already in Use
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### MongoDB Not Running
```powershell
# Start MongoDB service
net start MongoDB

# Or check if running
Get-Service MongoDB
```

### Module Not Found Error
```powershell
# Clean install
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### CORS Error
- Check VITE_API_URL in client/.env
- Verify CORS settings in server/index.js
- Restart both servers

---

## 📚 Quick Links

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **API Docs:** http://localhost:5000/api
- **MongoDB:** mongodb://localhost:27017

---

## 💡 Pro Tips

1. **Use nodemon** for auto-restart during development
2. **Keep terminals open** to see real-time logs
3. **Use browser DevTools** for frontend debugging
4. **Check MongoDB Compass** for database visualization
5. **Use Postman** for API testing
6. **Enable hot reload** in Vite for faster development

---

## 🎯 Next Steps

1. ✅ Complete initial setup
2. ✅ Run both servers
3. ✅ Test with seed data
4. ✅ Explore all features
5. ✅ Read documentation
6. ✅ Deploy to production

---

**Need Help?** Check the full documentation:
- [README.md](README.md)
- [QUICKSTART.md](QUICKSTART.md)
- [DEPLOYMENT.md](DEPLOYMENT.md)
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

**Happy Coding! 🚀**
