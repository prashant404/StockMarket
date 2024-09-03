const axios = require('axios');
const Stock = require('../models/Stock');

exports.searchAndSaveStock = async (req, res) => {
  const symbol = req.params.symbol;

  try {
    
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);

    const stockData = response.data;


    let stock = await Stock.findOne({ symbol });
    if (!stock) {
      stock = new Stock({
        symbol,
        name: stockData["Meta Data"]["2. Symbol"],
        data: stockData["Time Series (5min)"] 
      });
      await stock.save();
    }

    res.json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stock data' });
  }
};

exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving stocks' });
  }
};
