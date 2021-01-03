import React from "react";
import { Helmet } from "react-helmet";

export default function SEO(props) {
  const { title, keywords } = props;
  return (
    <Helmet>
      <meta name='robots' content='index, follow' />
      <meta name="description" content="Learn about Cryptocurrency" />
      <meta name="keywords" content="BTC,Bitcoin,ETH ,Ethereum,Tether,XRP,DOT2 ,Polkadot,DOT1,Polkadot,BCH,BitcoinCash,
        ADA,Cardano,BNB,BinanceCoin,XLM,XEM,CCXX,DOGE,CEL,VET,ATOM2,Cosmos,VeChain,Celsius,Dogecoin,
        XTZ,Tezos,CounosX,NEM,TRX,TRON,THETA,THETA,XLM,XMR,Monero,Stellar,Stellar,Coin,BSV,BitcoinSV,
        articles,stocks,stock,block chain,block,chain,crypto,currency,courses,learn crypto" />
      <meta name="author" content="Code Crafters Acad" />
      <title>BitSite | {title}</title>
    </Helmet>
  )
}
