const Portfolio = require("../models/Portfolio");

const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ userId: req.user._id }).populate("stockId");
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addStockToPortfolio = async (req, res) => {
  const { stockId, quantity, purchasePrice } = req.body;

  try {
    const newStock = await Portfolio.create({
      userId: req.user._id,
      stockId,
      quantity,
      purchasePrice,
    });

    res.status(201).json(newStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStockInPortfolio = async (req, res) => {
  const { id } = req.params;
  const { quantity, purchasePrice } = req.body;

  try {
    const updatedStock = await Portfolio.findByIdAndUpdate(
      id,
      { quantity, purchasePrice },
      { new: true }
    );

    if (!updatedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStockFromPortfolio = async (req, res) => {
  try {
    const stockId = req.params.id;
    const userId = req.user.id;

    const portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const stockIndex = portfolio.stocks.findIndex(stock => stock._id.toString() === stockId);

    if (stockIndex === -1) {
      return res.status(404).json({ message: "Stock not found in portfolio" });
    }


    portfolio.stocks.splice(stockIndex, 1);


    await portfolio.save();

    res.status(200).json({ message: "Stock removed from portfolio successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getPortfolio,
  addStockToPortfolio,
  updateStockInPortfolio,
  deleteStockFromPortfolio,
};
