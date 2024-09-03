const Stock = require('../models/Stock');
const User = require('../models/User');

exports.addToWatchlist = async (req, res) => {
  const { stockId } = req.body;
  const userId = req.user.id;

  try {
    const stock = await Stock.findById(stockId);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.watchlist.includes(stockId)) {
      return res.status(400).json({ message: 'Stock already in watchlist' });
    }

    user.watchlist.push(stockId);
    await user.save();

    res.status(200).json({ message: `Stock ${stockId} added to watchlist`, watchlist: user.watchlist });
  } catch (error) {
    console.error('Error adding stock to watchlist:', error);
    res.status(500).json({ message: 'Error adding stock to watchlist' });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  const { stockId } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.watchlist.includes(stockId)) {
      return res.status(404).json({ message: 'Stock not found in watchlist' });
    }

    user.watchlist = user.watchlist.filter(id => id.toString() !== stockId);
    await user.save();

    res.status(200).json({ message: `Stock ${stockId} removed from watchlist`, watchlist: user.watchlist });
  } catch (error) {
    console.error('Error removing stock from watchlist:', error);
    res.status(500).json({ message: 'Error removing stock from watchlist' });
  }
};

exports.getWatchlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate('watchlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ watchlist: user.watchlist });
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ message: 'Error fetching watchlist' });
  }
};
