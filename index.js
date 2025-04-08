import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import lotteryRoutes from './routes/lottery.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', lotteryRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(3000, () => console.log('🚀 Server running on port 3000'));
  })
  .catch(err => console.error('❌ MongoDB error:', err));