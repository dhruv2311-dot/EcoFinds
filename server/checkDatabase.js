import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecofinds';

const checkDatabase = async () => {
  try {
    console.log('🔍 Checking database...\n');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    console.log(`📍 Database: ${MONGODB_URI}\n`);

    // Check users
    const userCount = await User.countDocuments();
    console.log(`👥 Users in database: ${userCount}`);
    
    if (userCount > 0) {
      const users = await User.find().select('username email');
      users.forEach(user => {
        console.log(`   - ${user.username} (${user.email})`);
      });
    }
    console.log('');

    // Check products
    const productCount = await Product.countDocuments();
    console.log(`📦 Products in database: ${productCount}`);
    
    if (productCount > 0) {
      const products = await Product.find().select('title category price sold');
      console.log('\nProducts:');
      products.forEach(product => {
        console.log(`   - ${product.title.substring(0, 50)}... | ${product.category} | ₹${product.price} | Sold: ${product.sold}`);
      });
    } else {
      console.log('⚠️  No products found in database!');
      console.log('\n💡 Run seed script:');
      console.log('   node seedDataWithImages.js');
    }

    // Check for sold products
    const soldProducts = await Product.countDocuments({ sold: true });
    const availableProducts = await Product.countDocuments({ sold: false });
    
    console.log('\n📊 Product Status:');
    console.log(`   Available: ${availableProducts}`);
    console.log(`   Sold: ${soldProducts}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkDatabase();
