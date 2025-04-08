import express from 'express';
import User from '../models/User.js';
import Entry from '../models/Entry.js';
import Winner from '../models/Winner.js';
import Referral from '../models/Referral.js';
import { selectWeightedWinners } from '../utils/selectWinners.js';

const router = express.Router();

router.post('/join', async (req, res) => {
  try {
    const { telegram_id, username, first_name, is_premium, wallet_address, referred_by, amount, round_id } = req.body;

    let user = await User.findOne({ telegram_id });
    if (!user) {
      user = await User.create({
        telegram_id, username, first_name, is_premium, wallet_address,
        referred_by, referral_code: `ref_${telegram_id}`
      });

      if (referred_by) {
        const referrer = await User.findOne({ referral_code: referred_by });
        if (referrer) {
          await Referral.create({ referrer_id: referrer._id, referred_user_id: user._id });
        }
      }
    }

    await Entry.create({ user_id: user._id, amount, round_id });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Join failed' });
  }
});

router.get('/winners', async (req, res) => {
  const winners = await Winner.find().sort({ timestamp: -1 }).limit(5);
  res.json(winners);
});

router.post('/distribute', async (req, res) => {
  try {
    const round_id = req.body.round_id;
    const entries = await Entry.find({ round_id }).populate('user_id');

    const totalPool = entries.reduce((sum, e) => sum + e.amount, 0);
    const selected = selectWeightedWinners(entries);

    const winnerData = selected.map((e, idx) => ({
      address: e.user_id.wallet_address,
      amount: idx === 0 ? totalPool * 0.5 : idx === 1 ? totalPool * 0.15 : totalPool * 0.1,
    }));

    await Winner.create({ round_id, winners: winnerData, total_pool: totalPool });

    res.json({ success: true, winners: winnerData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

export default router;