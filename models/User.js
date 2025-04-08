import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  telegram_id: { type: Number, required: true, unique: true },
  username: String,
  first_name: String,
  is_premium: Boolean,
  wallet_address: { type: String, required: true },
  referred_by: { type: String, default: null },
  referral_code: { type: String, unique: true },
  joined_at: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);