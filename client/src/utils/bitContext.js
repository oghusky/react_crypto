import React from 'react';

const BitContext = React.createContext({
  stocks: [],
  articles: [],
  sources: [],
  videos: [],
  setVides: () => { },
  symbol: {},
  setSymbol: () => { }
});

export default BitContext;