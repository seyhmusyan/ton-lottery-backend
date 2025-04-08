import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
  referrer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referred_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reward: { type: Number, default: 0 },
});

export default mongoose.model('Referral', referralSchema);