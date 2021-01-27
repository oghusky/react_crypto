import React from 'react';
import Container from 'react-bootstrap/Container';
import desktop from '../../ads/CryptoWoke-Ad-970x250.jpg';
import mobile from '../../ads/cryptowoke-mobile.jpg';
import './AdDiv.css';
export default function AdDiv() {
  return (
    <Container className="my-3">
      <div id="desktop-ad">
        <a target="_blank" href="http://cryptowokemovement.com">
          <img src={desktop} alt="Crypto Woke Desktop Ad" />
        </a>
      </div>
      <div id="mobile-ad">
        <a target="_blank" href="http://cryptowokemovement.com">
          <img src={mobile} alt="Crypto Woke Mobile Ad" />
        </a>
      </div>
    </Container>
  )
}