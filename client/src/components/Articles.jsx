import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import StockBar from './StockBar'
import BitContext from '../utils/bitContext';
export default function Articles() {
  const { articles } = useContext(BitContext);

  return (
    <div>
      <StockBar />
      <Container style={{ width: "90%", margin: "0 auto" }}>
        <h3 className="text-center my-3 article-header"><span style={{ color: "#BB86FC", letterSpacing: ".12rem", fontWeight: "bold" }}>Crypto</span>currency News</h3>
        {articles.map((article, i) => {
          if (article.urlToImage !== null && article.content !== null) {
            return (<Card key={i}>
              <Row className="my-3">
                <Col md={4}>
                  <Card.Img src={article.urlToImage} alt={article.title} style={{ margin: "0 auto", display: "block", maxHeight: "150px", width: "auto" }} />
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
        })}
      </Container>
    </div>
  )
}
