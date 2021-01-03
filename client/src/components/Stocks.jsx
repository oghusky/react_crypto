import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BitContext from '../utils/bitContext';
import Table from 'react-bootstrap/Table';
import SEO from './SEO';

export default function Stocks() {
  const { stocks } = useContext(BitContext);
  return (
    <div>
      <SEO title="Stock Overview" />
      <h3 className="text-center" style={{ color: "#f7f7f7" }}><span style={{ color: "#BB86FC" }}>STOCK</span> OVERVIEW</h3>
      <Table style={{ width: "70%", margin: "0 auto" }} className="stock-table">
        <thead>
          <tr style={{ color: "#f7f7f7" }}>
            <th></th>
            <th>SYM.</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CHANGE</th>
            <th>%CHANGE</th>
            <th>MKT CAP</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s, i) => {
            return (
              <tr key={i} style={{ color: "#f7f7f7" }}>
                <td>{s.img ? <img src={s.img} alt={s.name} /> : <span className="text-center" style={{ color: "##5cb85c" }}>&#x20BF;</span>}</td>
                <td><Link to={`/stocks/${s.abbr}`} style={{ color: "#03DAC6", textDecoration: "underline", fontWeight: "bold" }}>{s.abbr}</Link></td>
                <td>{s.name}</td>
                <td>{s.cost}</td>
                <td className="stock-cost" style={{
                  color: s.change.charAt(0) === "+" ? "#03DAC6" :
                    s.change.charAt(0) === "-" ? "#CF6679" : "#f7f7f7"
                }}>{s.change}</td>
                <td className="per_change" style={{
                  color: s.per_change.charAt(0) === "+" ? "#03DAC6" :
                    s.per_change.charAt(0) === "-" ? "#CF6679" : "#f7f7f7"
                }}>{s.per_change}</td>
                <td>{s.cap}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  )
}
