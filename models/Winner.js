import mongoose from 'mongoose';

const winnerSchema = new mongoose.Schema({
  round_id: String,
  winners: [{ address: String, amount: Number }],
  total_pool: Number,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Winner', winnerSchema);