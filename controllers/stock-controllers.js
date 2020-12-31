require('dotenv').config()
const { cryptoScrape, singleCrypto, getYoutube } = require('../utils/stock-scraper-helper'),
  NewsAPI = require('newsapi'),
  newsapi = new NewsAPI(process.env.NEWS_API_KEY);


exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await cryptoScrape("https://finance.yahoo.com/cryptocurrencies");
    res.status(200).json({
      stocks,
      path: "all stocks",
      msg: "Found All Stocks"
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      path: "Err",
      msg: "Something went wrong"
    })
  }
}

exports.getArticles = async (req, res) => {
  try {
    const articles = await newsapi.v2.everything({
      sources: 'the-verge, fortune, google-news, abc-news, associated-press, bbc-news, business-insider, nbc-news, newsweek, techcrunch, the-huffington-post, the-next-web, the-wall-street-journal, the-washington-times',
      q: "cryptocurrency"
    })
    res
      .status(200)
      .json({
        articles,
        path: "learn"
      })
  } catch (err) {
    res.status(500).json({
      path: "500",
      msg: "Uh Oh Something went wrong"
    })
  }
}

exports.getStockNums = async (req, res) => {
  const { stockName } = req.params;
  try {
    const stock = await singleCrypto(`https://finance.yahoo.com/quote/${stockName}?p=${stockName}`);
    res
      .status(200)
      .json({
        stock,
        msg: "Found Stock"
      })
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong", path: stockName })
  }
}

exports.getYouTube = async (req, res) => {
  let stockName = req.params.stockName || "cryptocurrency";
  try {
    const fetchData = async (url) => {
      const axios = require("axios");
      const cheerio = require("cheerio");
      let result = await axios.get(url);
      return cheerio.load(result.data);
    }

    const getYoutube = async (url) => {
      const yt = await fetchData(url);
      const tube = yt("body").children()[9].children[0].data.split("var ytInitialData = ")[1].split(";")[0];
      const parsed = JSON.parse(tube);
      const vid_arr = parsed.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents
      const vids = vid_arr.filter(item => item.hasOwnProperty("videoRenderer")).map(item => item.videoRenderer.videoId)
      return vids
    }
    res
      .status(200)
      .json({
        msg: "Found Videos",
        vids: await getYoutube(`https://www.youtube.com/results?search_query=${stockName}`)
      })
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong", path: stockName })
  }
}