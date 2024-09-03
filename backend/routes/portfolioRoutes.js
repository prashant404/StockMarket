const express = require("express");
const { protect } = require("../utils/authMiddleware");
const {
  getPortfolio,
  addStockToPortfolio,
  updateStockInPortfolio,
  deleteStockFromPortfolio,
} = require("../controllers/portfolioController");

const router = express.Router();

router.get("/", protect, getPortfolio);
router.post("/", protect, addStockToPortfolio);
router.put("/:id", protect, updateStockInPortfolio);
router.delete("/:id", protect, deleteStockFromPortfolio);

module.exports = router;
