import User from '../models/User.js';

// Get wallet balance and transactions
export const getWallet = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('walletBalance transactions');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.json({
      walletBalance: user.walletBalance,
      transactions: user.transactions.sort((a, b) => b.date - a.date)
    });
  } catch (error) {
    next(error);
  }
};

// Add funds to wallet (simulating adding money)
export const addFunds = async (req, res, next) => {
  try {
    const { amount, description } = req.body;
    
    if (!amount || amount <= 0) {
      res.status(400);
      throw new Error('Invalid amount');
    }

    const user = await User.findById(req.user._id);
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.walletBalance += Number(amount);
    user.transactions.push({
      amount: Number(amount),
      type: 'CREDIT',
      description: description || 'Added funds to wallet'
    });

    await user.save();
    
    res.json({
      message: 'Funds added successfully',
      walletBalance: user.walletBalance
    });
  } catch (error) {
    next(error);
  }
};
