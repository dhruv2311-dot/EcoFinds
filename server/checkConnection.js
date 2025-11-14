import dotenv from 'dotenv';

dotenv.config();

console.log('\n🔍 Checking MongoDB Connection Configuration...\n');

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.log('❌ MONGODB_URI not found in .env file!');
  console.log('\n💡 Create .env file with:');
  console.log('   MONGODB_URI=mongodb+srv://...\n');
  process.exit(1);
}

console.log('📍 Current MONGODB_URI:');
console.log(`   ${mongoUri}\n`);

// Check if using local or Atlas
if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
  console.log('⚠️  WARNING: Using LOCAL MongoDB!');
  console.log('   This requires MongoDB Compass to be running.\n');
  console.log('💡 To use MongoDB Atlas (cloud):');
  console.log('   1. Get Atlas connection string');
  console.log('   2. Update .env file:');
  console.log('      MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecofinds\n');
  console.log('📖 See: FIX_ATLAS_CONNECTION.md for detailed guide\n');
} else if (mongoUri.includes('mongodb+srv://')) {
  console.log('✅ Using MongoDB Atlas (Cloud Database)');
  console.log('   Products will work without Compass!\n');
  
  // Extract cluster info
  const match = mongoUri.match(/@([^/]+)/);
  if (match) {
    console.log(`🌐 Cluster: ${match[1]}\n`);
  }
  
  // Check if database name is specified
  if (!mongoUri.includes('/ecofinds')) {
    console.log('⚠️  WARNING: Database name not specified!');
    console.log('   Add /ecofinds before the ?');
    console.log('   Example: ...mongodb.net/ecofinds?retryWrites=true\n');
  } else {
    console.log('✅ Database name: ecofinds\n');
  }
} else {
  console.log('⚠️  Unknown MongoDB connection type\n');
}

// Check other env variables
console.log('🔐 Other Environment Variables:');
console.log(`   PORT: ${process.env.PORT || 'Not set (will use default)'}`);
console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set' : '❌ Not set'}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'Not set'}\n`);

if (!process.env.JWT_SECRET) {
  console.log('⚠️  JWT_SECRET is required!');
  console.log('   Add to .env: JWT_SECRET=your_secret_key_here\n');
}

console.log('═══════════════════════════════════════════════════════\n');
