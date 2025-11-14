import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecofinds';

// Sample data
const sampleUsers = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    profilePic: 'https://i.pravatar.cc/150?img=1'
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password123',
    profilePic: 'https://i.pravatar.cc/150?img=5'
  },
  {
    username: 'mike_wilson',
    email: 'mike@example.com',
    password: 'password123',
    profilePic: 'https://i.pravatar.cc/150?img=12'
  }
];

const sampleProducts = [
  {
    title: 'iPhone 12 Pro - Excellent Condition',
    description: 'Gently used iPhone 12 Pro, 128GB. No scratches, comes with original box and charger. Battery health 95%.',
    category: 'Electronics',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?w=400&h=300&fit=crop'
  },
  {
    title: 'Vintage Wooden Study Table',
    description: 'Beautiful solid wood study table with drawers. Perfect for home office. Minor wear adds character.',
    category: 'Furniture',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop'
  },
  {
    title: 'Nike Running Shoes - Size 10',
    description: 'Barely used Nike running shoes. Worn only 3-4 times. Excellent condition, very comfortable.',
    category: 'Sports',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'
  },
  {
    title: 'Harry Potter Complete Book Set',
    description: 'Complete Harry Potter series in excellent condition. All 7 books, hardcover editions.',
    category: 'Books',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=300&fit=crop'
  },
  {
    title: 'Sony Wireless Headphones',
    description: 'Sony WH-1000XM4 noise cancelling headphones. Great sound quality, minimal usage.',
    category: 'Electronics',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=300&fit=crop'
  },
  {
    title: 'Leather Office Chair',
    description: 'Ergonomic leather office chair with adjustable height and lumbar support. Very comfortable.',
    category: 'Furniture',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop'
  },
  {
    title: 'Designer Denim Jacket',
    description: 'Levi\'s denim jacket, size M. Classic style, lightly worn. Perfect for casual wear.',
    category: 'Clothing',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=300&fit=crop'
  },
  {
    title: 'Garden Tool Set',
    description: 'Complete garden tool set including spade, rake, pruner, and watering can. Lightly used.',
    category: 'Home & Garden',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'
  },
  {
    title: 'LEGO Star Wars Set',
    description: 'Complete LEGO Star Wars Millennium Falcon set. All pieces included, built once.',
    category: 'Toys',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=300&fit=crop'
  },
  {
    title: 'Canon DSLR Camera',
    description: 'Canon EOS 1500D with 18-55mm lens. Excellent condition, low shutter count. Includes bag.',
    category: 'Electronics',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop'
  },
  {
    title: 'Yoga Mat & Accessories',
    description: 'Premium yoga mat with carrying strap, blocks, and resistance bands. Barely used.',
    category: 'Sports',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop'
  },
  {
    title: 'Programming Books Bundle',
    description: 'Collection of programming books: Clean Code, Design Patterns, JavaScript: The Good Parts.',
    category: 'Books',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      
      await user.save();
      createdUsers.push(user);
    }
    console.log(`👥 Created ${createdUsers.length} users`);

    // Create products (distribute among users)
    const createdProducts = [];
    for (let i = 0; i < sampleProducts.length; i++) {
      const product = new Product({
        ...sampleProducts[i],
        owner: createdUsers[i % createdUsers.length]._id
      });
      
      await product.save();
      createdProducts.push(product);
    }
    console.log(`📦 Created ${createdProducts.length} products`);

    console.log('\n✨ Database seeded successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Email: john@example.com | Password: password123');
    console.log('Email: jane@example.com | Password: password123');
    console.log('Email: mike@example.com | Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
