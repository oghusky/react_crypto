import React, { useContext } from 'react';
import BitContext from '../utils/bitContext';
import Container from 'react-bootstrap/Container';
export default function StockBar() {
  const { stocks } = useContext(BitContext);
  return (
    <Container>
      <div className="d-flex justify-content-center stock-bar">
        {stocks.map((stock, i) => {
          if (i < 8) {
            return (
              <div key={stock.abbr} className="stock-td">
                <p className="stock-abbr">{stock.abbr}</p>
                <p className="stock-cost" style={{
                  color: stock.per_change.charAt(0) === "+" ? "#03DAC6" :
                    stock.per_change.charAt(0) === "-" ? "#CF6679" : "#f7f7f7"
                }}>{stock.cost}</p>
                <p className="per_change" style={{
                  color: stock.per_change.charAt(0) === "+" ? "#03DAC6" :
                    stock.per_change.charAt(0) === "-" ? "#CF6679" : "#f7f7f7"
                }}>{stock.per_change}</p>
              </div>
            )
          }
        })}
      </div>
    </Container>
  )
}

