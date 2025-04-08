import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  round_id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Entry', entrySchema);