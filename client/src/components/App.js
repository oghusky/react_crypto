// react
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// components
import BitContext from '../utils/bitContext';
import Navigation from './Navigation';
import Home from './Home';
import Articles from './Articles';
import Stocks from './Stocks'
import LearningSources from './LearningSources';
import Symbol from './Symbol';
import Videos from './Videos';
import Footer from './Footer';
import ErrorPage from './ErrorPage'
// modules
import API from '../utils/API';
// json file
import course_list from '../learn_crypto/sources.json'

function App() {
  const [symbol, setSymbol] = useState({})
  const [stocks, setStocks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [sources, setSources] = useState([]);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    // load stock
    loadStockInfo();
    // reload stock info
    const reloadStocks = setInterval(() => {
      loadStockInfo();
    }, 1000 * 60)
    // load course info
    setSources(course_list.courses);
    // load articles
    loadArticles();
    loadVideos("cryptocurrency");
    return () => clearInterval(reloadStocks);
  }, []);

  function loadStockInfo() {
    API.getHome()
      .then(res => {
        setStocks(res.data.stocks);
      })
      .catch(err => console.log(err));
  }
  function loadArticles() {
    API.getArticles()
      .then(res => {
        setArticles(res.data.articles.articles)
      }).catch(err => console.log(err))
  }
  function loadVideos(search) {
    API.getYouTube(search)
      .then(res => {
        setVideos(res.data.vids)
      }).catch(err => console.log(err));
  }
  return (
    <Router>
      <div>
        <BitContext.Provider value={{ stocks, articles, sources, symbol, setSymbol, videos, setVideos }}>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/articles" component={Articles} />
            <Route exact path="/stocks" component={Stocks} />
            <Route exact path="/stocks/:symbol" component={Symbol} />
            <Route exact path="/courses" component={LearningSources} />
            <Route exact path="/videos" component={Videos} />
            <Route exact path="/*" component={ErrorPage} />
          </Switch>
        </BitContext.Provider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
