import React, { useEffect, useState } from 'react';
import { getMarketData } from '../services/api';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CryptoList() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getMarketData();
      setCoins(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center mb-4">🪙 Criptomoedas em Alta</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {coins.map((coin) => (
          <Col key={coin.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    width={32}
                    height={32}
                    className="me-2"
                  />
                  <Card.Title className="mb-0">
                    <Link to={`/moeda/${coin.id}`}>{coin.name}</Link> ({coin.symbol.toUpperCase()})
                  </Card.Title>
                </div>
                <Card.Text>
                  <strong>Preço:</strong> ${coin.current_price.toLocaleString()} <br />
                  <strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()} <br />
                  <strong>Variação 24h:</strong>{' '}
                  <span style={{ color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                    {coin.price_change_percentage_24h >= 0 ? ' 🔼' : ' 🔽'}
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CryptoList;
