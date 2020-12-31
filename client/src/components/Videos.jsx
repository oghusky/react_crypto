import React, { useContext } from 'react'
import StockBar from './StockBar'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BitContext from '../utils/bitContext';
export default function Videos() {
  const { videos } = useContext(BitContext);
  console.log(videos);
  return (
    <div>
      <StockBar />
      <Container>
        <h3 className="text-center mt-3" style={{ color: "#f7f7f7" }}>Learn About Cryptocurrency</h3>
        <Row>
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
          })}
        </Row>
      </Container>
    </div>
  )
}
