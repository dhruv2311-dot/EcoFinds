import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecofinds';

// Sample users with realistic data
const sampleUsers = [
  {
    username: 'rajesh_kumar',
    email: 'rajesh@example.com',
    password: 'password123',
    profilePic: 'https://res.cloudinary.com/demo/image/upload/v1/avatars/man_1.jpg'
  },
  {
    username: 'priya_sharma',
    email: 'priya@example.com',
    password: 'password123',
    profilePic: 'https://res.cloudinary.com/demo/image/upload/v1/avatars/woman_1.jpg'
  },
  {
    username: 'amit_patel',
    email: 'amit@example.com',
    password: 'password123',
    profilePic: 'https://res.cloudinary.com/demo/image/upload/v1/avatars/man_2.jpg'
  },
  {
    username: 'sneha_reddy',
    email: 'sneha@example.com',
    password: 'password123',
    profilePic: 'https://res.cloudinary.com/demo/image/upload/v1/avatars/woman_2.jpg'
  }
];

// Realistic products with Cloudinary images
const sampleProducts = [
  // Electronics
  {
    title: 'iPhone 13 Pro - 128GB Pacific Blue',
    description: 'Excellent condition iPhone 13 Pro with 95% battery health. Includes original box, charger, and unused earphones. No scratches on screen. Minor wear on edges. Always used with case and screen protector. Selling because upgraded to iPhone 15.',
    category: 'Electronics',
    price: 52000,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/iphone_13_pro.jpg'
  },
  {
    title: 'MacBook Air M1 2020 - 8GB RAM 256GB SSD',
    description: 'Mint condition MacBook Air M1 with only 45 battery cycles. Perfect for students and professionals. Includes original charger and box. No dents or scratches. AppleCare+ valid till Dec 2024. Upgraded to M2 model.',
    category: 'Electronics',
    price: 65000,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/macbook_air_m1.jpg'
  },
  {
    title: 'Sony WH-1000XM4 Wireless Headphones - Black',
    description: 'Premium noise-cancelling headphones in excellent condition. Used for 6 months only. All accessories included: case, cables, adapter. Battery lasts 25+ hours. No wear on ear cushions. Selling due to upgrade to XM5.',
    category: 'Electronics',
    price: 18000,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/sony_headphones.jpg'
  },
  {
    title: 'Samsung Galaxy Tab S8 - 128GB WiFi',
    description: 'Like-new Samsung Tab S8 with S-Pen. Perfect for note-taking and digital art. Screen protector applied from day one. Includes keyboard cover worth ₹8000. Only 3 months old. Selling as received iPad as gift.',
    category: 'Electronics',
    price: 42000,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/samsung_tab_s8.jpg'
  },
  {
    title: 'Canon EOS 1500D DSLR with 18-55mm Lens',
    description: 'Beginner-friendly DSLR in pristine condition. Shutter count: 2,500 only. Includes camera bag, 32GB SD card, extra battery, and cleaning kit. Perfect for photography enthusiasts. Upgraded to mirrorless system.',
    category: 'Electronics',
    price: 28000,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/canon_1500d.jpg'
  },

  // Furniture
  {
    title: 'Ergonomic Office Chair - High Back Mesh',
    description: 'Premium ergonomic chair with lumbar support and adjustable armrests. Used for 1 year in home office. Very comfortable for long working hours. Height adjustable, 360° swivel. Black color. Reason for sale: relocating.',
    category: 'Furniture',
    price: 8500,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/office_chair.jpg'
  },
  {
    title: 'Solid Wood Study Table with Drawers',
    description: 'Beautiful sheesham wood study table (4ft x 2ft). Three spacious drawers for storage. Sturdy construction, no wobbling. Minor scratches add character. Perfect for students or home office. Must pick up from location.',
    category: 'Furniture',
    price: 12000,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/study_table.jpg'
  },
  {
    title: 'IKEA KALLAX 4x4 Shelf Unit - White',
    description: 'Versatile storage solution in excellent condition. Can be used as room divider or bookshelf. Easy to assemble/disassemble. Includes all screws and instructions. Dimensions: 147x147 cm. Moving to smaller apartment.',
    category: 'Furniture',
    price: 6500,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/ikea_kallax.jpg'
  },

  // Clothing
  {
    title: 'Levi\'s 511 Slim Fit Jeans - Dark Blue (32W 32L)',
    description: 'Authentic Levi\'s jeans worn 5-6 times only. Excellent condition, no fading. Bought from Levi\'s store for ₹4,500. Perfect fit for slim build. Smoke-free, pet-free home. Selling as lost weight.',
    category: 'Clothing',
    price: 1800,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/levis_jeans.jpg'
  },
  {
    title: 'Nike Air Max 270 - White/Black (Size 9 UK)',
    description: 'Genuine Nike Air Max in great condition. Worn occasionally, mostly indoors. No sole wear, clean uppers. Comes with original box. Bought from Nike store. Selling as have too many sneakers.',
    category: 'Clothing',
    price: 5500,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/nike_air_max.jpg'
  },
  {
    title: 'Zara Leather Jacket - Brown (Size M)',
    description: 'Stylish genuine leather jacket from Zara. Worn 10-12 times. Soft leather, comfortable fit. Perfect for winter. No tears or damage. Dry cleaned before listing. Original price ₹12,000. Great deal!',
    category: 'Clothing',
    price: 4500,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/leather_jacket.jpg'
  },

  // Books
  {
    title: 'Harry Potter Complete Collection - Hardcover',
    description: 'All 7 Harry Potter books in hardcover. Excellent condition, minimal shelf wear. Perfect for collectors or first-time readers. Includes: Philosopher\'s Stone to Deathly Hallows. Bought from Crossword. Great gift idea!',
    category: 'Books',
    price: 3500,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/harry_potter_set.jpg'
  },
  {
    title: 'The Alchemist by Paulo Coelho - Paperback',
    description: 'Inspirational classic in good condition. Minimal highlighting. Life-changing book about following your dreams. Read once, well-maintained. Perfect for book lovers. Smoke-free home.',
    category: 'Books',
    price: 150,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/alchemist.jpg'
  },
  {
    title: 'NCERT Complete Set - Class 12 Science (PCM)',
    description: 'Complete NCERT textbooks for Class 12 Physics, Chemistry, and Maths. Latest edition. Minimal writing, mostly clean. Perfect for JEE/NEET preparation. Includes solved examples. Great condition.',
    category: 'Books',
    price: 800,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/ncert_books.jpg'
  },

  // Sports
  {
    title: 'Yonex Badminton Racket - Nanoray Series',
    description: 'Professional-grade Yonex racket. Lightweight and powerful. Used in 10-15 matches only. Includes cover and extra grip. No frame damage. Perfect tension. Ideal for intermediate to advanced players.',
    category: 'Sports',
    price: 2800,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/badminton_racket.jpg'
  },
  {
    title: 'Yoga Mat with Carrying Bag - 6mm Thick',
    description: 'Premium NBR yoga mat with excellent cushioning. Non-slip surface on both sides. Includes carrying strap and bag. Used for 3 months. Clean and odor-free. Perfect for home workouts and yoga practice.',
    category: 'Sports',
    price: 800,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/yoga_mat.jpg'
  },
  {
    title: 'Cosco Football - Size 5 (FIFA Approved)',
    description: 'Official size football in excellent condition. Used 4-5 times only. Maintains air pressure well. Perfect for matches and practice. Suitable for all surfaces. Great for football enthusiasts.',
    category: 'Sports',
    price: 600,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/football.jpg'
  },

  // Home & Garden
  {
    title: 'Philips Air Purifier - AC1215/20',
    description: 'Effective air purifier for rooms up to 270 sq ft. HEPA filter removes 99.97% pollutants. Used for 8 months. Includes extra filter worth ₹2,500. Perfect for allergies and pollution. Moving abroad.',
    category: 'Home & Garden',
    price: 8000,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/air_purifier.jpg'
  },
  {
    title: 'Indoor Plant Collection - Set of 5 with Pots',
    description: 'Beautiful collection: Money Plant, Snake Plant, Peace Lily, Aloe Vera, and Pothos. All healthy and thriving. Includes decorative ceramic pots. Perfect for home/office. Easy to maintain. Relocating.',
    category: 'Home & Garden',
    price: 1200,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/indoor_plants.jpg'
  },
  {
    title: 'Garden Tool Set - 5 Pieces with Bag',
    description: 'Complete gardening toolkit: spade, fork, trowel, pruner, and rake. Stainless steel tools with wooden handles. Includes carrying bag. Barely used, like new. Perfect for home gardening enthusiasts.',
    category: 'Home & Garden',
    price: 1500,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/garden_tools.jpg'
  },

  // Toys
  {
    title: 'LEGO Star Wars Millennium Falcon - 75192',
    description: 'Ultimate collector\'s LEGO set with 7,500+ pieces. Built once, displayed in glass case. All pieces present, includes manual. Perfect condition. Original box available. Rare set for serious collectors.',
    category: 'Toys',
    price: 45000,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/lego_millennium_falcon.jpg'
  },
  {
    title: 'Hot Wheels Car Collection - 50 Cars with Track',
    description: 'Amazing collection of 50 Hot Wheels cars. Includes loop track set and launcher. All cars in excellent condition. Perfect gift for kids 5-12 years. Hours of entertainment guaranteed!',
    category: 'Toys',
    price: 3500,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/hot_wheels.jpg'
  },
  {
    title: 'Barbie Dreamhouse Playset - 3 Stories',
    description: 'Large Barbie dreamhouse with furniture and accessories. Excellent condition, all parts working. Includes elevator, pool, and 20+ accessories. Perfect for kids 3-10 years. Child outgrew it.',
    category: 'Toys',
    price: 6500,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/barbie_dreamhouse.jpg'
  },

  // Other
  {
    title: 'Acoustic Guitar - Yamaha F310 with Bag',
    description: 'Beginner-friendly acoustic guitar in great condition. Perfect sound quality. Includes padded gig bag, extra strings, picks, and tuner. Ideal for learning. Well-maintained. Selling as upgraded to electric.',
    category: 'Other',
    price: 6000,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/acoustic_guitar.jpg'
  },
  {
    title: 'Instant Pot Duo 6Qt - Pressure Cooker',
    description: '7-in-1 programmable pressure cooker. Used 20-25 times. Cooks rice, dal, curry perfectly. Includes recipe book and accessories. Easy to clean. Perfect for bachelors and small families. Moving abroad.',
    category: 'Other',
    price: 4500,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/instant_pot.jpg'
  },
  {
    title: 'Camping Tent - 4 Person Waterproof',
    description: 'Spacious camping tent for 4 people. Waterproof and windproof. Used in 3 trips only. Includes carry bag, stakes, and instructions. Easy setup. Perfect for weekend getaways and trekking.',
    category: 'Other',
    price: 3200,
    image: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_800/v1/products/camping_tent.jpg'
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding with realistic products...\n');

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data\n');

    // Create users
    console.log('👥 Creating users...');
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
      console.log(`   ✓ Created user: ${user.username}`);
    }
    console.log(`\n✅ Created ${createdUsers.length} users\n`);

    // Create products (distribute among users)
    console.log('📦 Creating products...');
    const createdProducts = [];
    for (let i = 0; i < sampleProducts.length; i++) {
      const product = new Product({
        ...sampleProducts[i],
        owner: createdUsers[i % createdUsers.length]._id
      });
      
      await product.save();
      createdProducts.push(product);
      console.log(`   ✓ ${product.title.substring(0, 50)}...`);
    }
    console.log(`\n✅ Created ${createdProducts.length} products\n`);

    // Summary
    console.log('═══════════════════════════════════════════════════════');
    console.log('✨ Database seeded successfully with realistic data!\n');
    console.log('📊 Summary:');
    console.log(`   • Users: ${createdUsers.length}`);
    console.log(`   • Products: ${createdProducts.length}`);
    console.log(`   • Categories: 8 (Electronics, Furniture, Clothing, etc.)`);
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('🔐 Test Credentials (All passwords: password123):');
    console.log('   ┌─────────────────────────────────────────────────┐');
    sampleUsers.forEach(user => {
      console.log(`   │ Email: ${user.email.padEnd(25)} │`);
    });
    console.log('   └─────────────────────────────────────────────────┘\n');

    console.log('💡 Images are hosted on Cloudinary (Demo account)');
    console.log('🎯 Perfect for hackathon demo!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
