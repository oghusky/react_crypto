import axios from 'axios';

export default {
  getHome: function () {
    return axios.get("/api/all_stocks");
  },
  getOneStock: function (stockName) {
    return axios.get(`/api/stock/${stockName}`);
  },
  getArticles: function () {
    return axios.get("/api/articles");
  },
  getYouTube: function (stockName) {
    return axios.get(`/api/videos/${stockName}`)
  }
}