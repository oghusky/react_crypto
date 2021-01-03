import React, { useContext } from 'react';
// components
import Container from 'react-bootstrap/Container';
import StockBar from './StockBar'
// context
import BitContext from '../utils/bitContext';
import SEO from './SEO';
// css
import './LearningSources.css'
export default function LearningSources() {
  const { sources } = useContext(BitContext)
  return (
    <div>
      <SEO title="Learning Sources" />
      <StockBar />
      <Container>
        <h3 className="text-center my-3 article-header">FREE <span style={{ color: "#BB86FC", letterSpacing: ".12rem", fontWeight: "bold" }}>Crypto</span>currency Courses</h3>
        <h6 className="text-center">(ACCORDING TO FORBES)</h6>
        <div className="my-3 courses">
          {sources.map((item, i) => {
            return <div className="my-1" key={item.title}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <h5 style={{ color: "#BB86FC" }}>{i + 1}. {item.title}</h5>
              </a>
              <hr />
              <p><em>{item.summary}</em></p>
            </div>
          })}
        </div>
        <p><small>Cited: <em>*Eleven Free Courses To Learn Bitcoin, Blockchain And Cryptocurrencies.</em> Forbes, 2019.
          <a href="https://www.forbes.com/sites/rogerhuang/2019/08/12/eleven-free-courses-to-learn-bitcoin-blockchain-and-cryptocurrencies/?sh=72bdb7f50a72">https://www.forbes.com/sites/rogerhuang/2019/08/12/eleven-free-courses-to-learn-bitcoin-blockchain-and-cryptocurrencies/?sh=72bdb7f50a72.</a> Accessed 30 December 2020.</small></p>
      </Container>
    </div>
  )
}
