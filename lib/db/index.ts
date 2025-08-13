import mongoose from 'mongoose';

// MongoDB connection string - should be in environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aura-therapy';

// Connect to MongoDB
export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Disconnect from MongoDB
export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    throw error;
  }
}

// Get the database instance
export const db = mongoose.connection;

// Export mongoose for schema definitions
export { mongoose };
