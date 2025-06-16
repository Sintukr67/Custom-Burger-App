import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import burgerRoutes from './routes/burgers.js';
import orderRoutes from './routes/orders.js';
import ingredientRoutes from './routes/ingredients.js';

dotenv.config();

const app = express();
const PORT = 5001; // Explicitly set port to 5001

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/brrrgrrr', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/burgers', burgerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/ingredients', ingredientRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Brrrgrrr API is running!' });
});

// Error handling for port in use
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});