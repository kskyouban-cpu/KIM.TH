const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let client = null;
let db = null;

const connectDB = async () => {
  try {
    client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
    await client.connect();
    db = client.db(process.env.DATABASE_NAME || 'kim-th');
    console.log('✅ Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
};

const closeDB = async () => {
  if (client) {
    await client.close();
    console.log('✅ MongoDB connection closed');
  }
};

module.exports = {
  connectDB,
  getDB,
  closeDB
};