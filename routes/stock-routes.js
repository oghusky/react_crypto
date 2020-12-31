const router = require('express').Router();

const {
  getArticles,
  getAllStocks,
  getStockNums,
  getYouTube } = require('../controllers/stock-controllers');

router
  .route("/articles")
  .get(getArticles);

router
  .route("/all_stocks")
  .get(getAllStocks);

router
  .route("/stock/:stockName")
  .get(getStockNums);

router
  .route("/videos/:stockName")
  .get(getYouTube);

module.exports = router;