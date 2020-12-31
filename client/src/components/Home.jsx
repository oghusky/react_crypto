import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import './Home.css';
import BitContext from '../utils/bitContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import StockBar from './StockBar';
export default function Home() {
  const { stocks, articles, sources, videos } = useContext(BitContext);
  console.log(sources);
  return (
    <div className="Home">
      <StockBar />
      <Row>
        <Col md={8}>
          <h5 className="text-center mt-3" style={{ color: "#f7f7f7" }}>Overview</h5>
          <Container>
            <Table style={{ width: "80%", margin: "0 auto" }} class="stock-table">
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
                }).slice(0, 10)}
              </tbody>
            </Table>
          </Container>
          <p className="text-center">
            <button className="btn" style={{ background: "transparent", border: "1px solid #03DAC6", color: "#03DAC6" }}><Link to="/stocks">SEE MORE</Link></button>
          </p>
          <hr style={{ border: "1px solid #f7f7f7", width: "80%", margin: "0 auto" }} />
          <Container style={{ width: "100%", margin: "0 auto" }}>
            <h5 className="text-center my-3 article-header">News</h5>
            {articles.map((article, i) => {
              if (article.urlToImage !== null && article.content !== null) {
                return (<Card key={i}>
                  <Row className="my-3">
                    <Col md={4}>
                      <Card.Img src={article.urlToImage} alt={article.title} style={{ margin: "0 auto", display: "block", maxHeight: "100px", width: "auto" }} />
                    </Col>
                    <Col md={8} style={{ borderLeft: "1px solid #f7f7f7" }}>
                      <Card.Body className="py-0">
                        <a className="article-link" href={article.url}>
                          <Card.Title className="mb-0 mt-2"><b>{article.title.length > 60 ? article.title.substr(0, 50) + "..." : article.title}</b></Card.Title>
                        </a>
                        <Card.Text className="text-muted my-0"><em>{article.author}</em></Card.Text>
                        <Card.Text className="my-0">{article.content.length > 200 ? article.content.substr(0, 300) + "..." : article.content}</Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>)
              }
            }).slice(0, 5)}
            <p className="text-center">
              <button className="btn" style={{ background: "transparent", border: "1px solid #03DAC6", color: "#03DAC6" }}><Link to="/articles">SEE MORE</Link></button>
            </p>
          </Container>
        </Col>
        <Col md={4} className="pr-0 pl-3 for-courses" style={{ borderLeft: "1px solid #f7f7f7" }}>
          <h5 className="text-left mt-3" style={{ color: "#f7f7f7" }}>Learn About Cryptocurrency</h5>

          {videos.map(item => {
            return <Col md={4} key={item} className="p-3">
              <iframe
                style={{ display: "block", margin: "0 auto" }}
                id="ytplayer"
                type="text/html"
                src={`https://www.youtube.com/embed/${item}`}
                allowFullScreen
                frameborder="0"></iframe>
            </Col>
          }).slice(0, 3)}
          <p className="p-btn">
            <button className="btn" style={{ background: "transparent", border: "1px solid #03DAC6", color: "#03DAC6" }}><Link to="/videos">SEE MORE</Link></button>
          </p>
          <h5 className="my-3 article-header">Free Courses</h5>
          <div className="my-3 mx-0 courses">
            {sources.map((item, i) => {
              return <div className="my-1" key={item.title}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <h6>{i + 1}. {item.title}</h6>
                </a>
                <hr />
                <p><em><small>{item.summary}</small></em></p>
              </div>
            }).slice(0, 3)}
          </div>
          <p className="p-btn">
            <button className="btn" style={{ background: "transparent", border: "1px solid #03DAC6", color: "#03DAC6" }}><Link to="/learn">SEE MORE</Link></button>
          </p>
        </Col>
      </Row>
    </div>
  )
}
