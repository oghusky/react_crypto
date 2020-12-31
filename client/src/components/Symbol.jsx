import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/API';
import StockBar from './StockBar';
import Container from 'react-bootstrap/Container'
export default function Symbol() {
  const params = useParams();
  const [stock, setStock] = useState({});
  const [color, setColor] = useState("")
  useEffect(() => {
    loadStock(params.symbol);
    const reloadSymbol = setInterval(() => {
      loadStock(params.symbol)
    }, 1000 * 60)
    return () => clearInterval(reloadSymbol);
  })

  const loadStock = (param) => {
    API.getOneStock(params.symbol)
      .then(res => setStock(res.data.stock))
      .catch(err => console.log(err));
    changeColor(stock)
  }
  const changeColor = (stock) => {
    if (stock.hasOwnProperty("current_change") && stock.current_change.charAt(0) === "+") {
      setColor("#03DAC6")
    } else if (stock.hasOwnProperty("current_change") && stock.current_change.charAt(0) === "-") {
      setColor("#CF6679")
    } else {
      setColor("#f7f7f7")
    }
  }
  return (
    <>
      <StockBar />
      <Container style={{ display: `${stock.hasOwnProperty("header") ? "block" : "none"}` }}>
        <div id="stock-info" style={{ color: "#f7f7f7", width: "60%", margin: "0 auto" }}>
          <h4 className="mt-3 mb-0"><b>{stock.header}</b></h4>
          <p><small>{stock.currency}</small></p>
          <h1><b>{stock.current_price}</b> <small style={{ color: color }}>{stock.current_change}</small></h1>
          <table className="table" style={{ color: "#f7f7f7" }}>
            <tbody>
              <tr>
                <td>Previous Close</td>
                <td><b>{stock.prev_close}</b></td>
              </tr>
              <tr>
                <td>Open</td>
                <td><b>{stock.current_open}</b></td>
              </tr>
              <tr>
                <td>Day Range</td>
                <td><b>{stock.day_range}</b></td>
              </tr>
              <tr>
                <td>Year Range</td>
                <td><b>{stock.year_range}</b></td>
              </tr>
              <tr>
                <td>Market Cap</td>
                <td><b>{stock.mkt_cap}</b></td>
              </tr>
              <tr>
                <td>Supply</td>
                <td><b>{stock.supply}</b></td>
              </tr>
              <tr>
                <td>volume</td>
                <td><b>{stock.volume}</b></td>
              </tr>
              <tr>
                <td>Volume (24hr)</td>
                <td><b>{stock.day_volume}</b></td>
              </tr>
              <tr>
                <td>Volume (24hr) All Currencies</td>
                <td><b>{stock.day_volume_all}</b></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </>
  )
}
