# 🚢 Deployment Guide - EcoFinds

Complete guide to deploy EcoFinds to production.

---

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Database backup created
- [ ] Security best practices implemented
- [ ] Performance optimized
- [ ] Error handling in place

---

## 🗄️ Database Deployment (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new project

### Step 2: Create Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0)
3. Select cloud provider and region
4. Click "Create Cluster"

### Step 3: Configure Database Access

1. Go to **Database Access**
2. Click "Add New Database User"
3. Create username and password
4. Set privileges to "Read and write to any database"

### Step 4: Configure Network Access

1. Go to **Network Access**
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Or add specific IP addresses

### Step 5: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `ecofinds`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecofinds?retryWrites=true&w=majority
```

---

## 🖥️ Backend Deployment (Render)

### Step 1: Prepare Backend

1. Ensure `package.json` has correct scripts:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

2. Push code to GitHub

### Step 2: Create Render Account

1. Go to [Render](https://render.com)
2. Sign up with GitHub

### Step 3: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select the `server` directory (if monorepo)
4. Configure:
   - **Name:** ecofinds-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### Step 4: Add Environment Variables

Add these in Render dashboard:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_production
NODE_ENV=production
```

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your backend URL: `https://ecofinds-api.onrender.com`

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. Update `client/src/api/axiosInstance.js` to use environment variable
2. Ensure build works locally:
```bash
cd client
npm run build
```

### Step 2: Create Vercel Account

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub

### Step 3: Import Project

1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 4: Add Environment Variables

Add in Vercel dashboard:

```env
VITE_API_URL=https://ecofinds-api.onrender.com/api
```

### Step 5: Deploy

1. Click "Deploy"
2. Wait for deployment
3. Your app is live at: `https://ecofinds.vercel.app`

---

## 🔧 Post-Deployment Configuration

### Update CORS Settings

In `server/index.js`, update CORS configuration:

```javascript
app.use(cors({
  origin: ['https://ecofinds.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

Redeploy backend after this change.

### Seed Production Database

```bash
# Connect to production database
MONGODB_URI=your_production_mongodb_uri node seedData.js
```

---

## 🔐 Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use strong JWT secrets
- Rotate secrets regularly

### 2. Database Security
- Use strong database passwords
- Limit IP access when possible
- Enable MongoDB encryption

### 3. API Security
- Rate limiting (consider express-rate-limit)
- Input validation
- Helmet.js for security headers

### 4. HTTPS
- Both Vercel and Render provide HTTPS by default
- Ensure all API calls use HTTPS

---

## 📊 Monitoring & Maintenance

### Render Monitoring
- Check logs in Render dashboard
- Set up health checks
- Monitor resource usage

### Vercel Analytics
- Enable Vercel Analytics
- Monitor page load times
- Track user behavior

### Database Monitoring
- Use MongoDB Atlas monitoring
- Set up alerts for high usage
- Regular backups

---

## 🐛 Common Deployment Issues

### Issue: CORS Errors
**Solution:** Update CORS origin in backend to include your Vercel URL

### Issue: Environment Variables Not Working
**Solution:** Redeploy after adding environment variables

### Issue: Build Fails
**Solution:** 
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check build logs for specific errors

### Issue: Database Connection Fails
**Solution:**
- Verify MongoDB connection string
- Check network access settings in Atlas
- Ensure database user has correct permissions

### Issue: API Calls Fail
**Solution:**
- Verify VITE_API_URL is correct
- Check if backend is running
- Inspect network tab in browser DevTools

---

## 🔄 Continuous Deployment

### Automatic Deployments

Both Vercel and Render support automatic deployments:

1. **Push to GitHub** → Automatic deployment
2. **Pull Request** → Preview deployment
3. **Merge to main** → Production deployment

### Deployment Workflow

```
Local Development → Git Push → GitHub → Auto Deploy
```

---

## 📈 Scaling Considerations

### Free Tier Limitations

**Render Free Tier:**
- Spins down after 15 minutes of inactivity
- First request after spin-down is slow
- Limited resources

**Vercel Free Tier:**
- 100GB bandwidth/month
- Unlimited deployments

### Upgrade Path

When you need more:
1. Upgrade Render to paid tier ($7/month)
2. Upgrade MongoDB Atlas to M2+ cluster
3. Consider CDN for static assets
4. Implement caching strategies

---

## 🎯 Performance Optimization

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Minification (done by Vite)

### Backend
- Database indexing
- Query optimization
- Caching (Redis)
- Compression middleware

### Database
- Proper indexing
- Connection pooling
- Query optimization

---

## 📝 Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user and network access configured
- [ ] Backend deployed to Render
- [ ] Backend environment variables set
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variables set
- [ ] CORS configured correctly
- [ ] Database seeded with initial data
- [ ] All features tested in production
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Monitoring set up
- [ ] Backup strategy in place

---

## 🌟 Custom Domain (Optional)

### Vercel Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation

### Render Custom Domain

1. Go to Service Settings → Custom Domain
2. Add your domain
3. Update DNS records
4. Enable HTTPS

---

## 📞 Support

If you encounter issues:

1. Check deployment logs
2. Review this guide
3. Check official documentation:
   - [Render Docs](https://render.com/docs)
   - [Vercel Docs](https://vercel.com/docs)
   - [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

---

## 🎉 Congratulations!

Your EcoFinds application is now live in production! 🚀

**Share your deployment:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.onrender.com`

---

**Made with 💚 for a sustainable future**
