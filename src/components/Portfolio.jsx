import React, { useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';
import { Card, Button, Row, Col } from 'react-bootstrap';

function Portfolio() {
  const { portfolio, removeFromPortfolio } = useContext(PortfolioContext);

  return (
    <div>
      <h2 className="text-center mb-4">💼 Minha Carteira</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {portfolio.map((coin) => (
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
                    {coin.name} ({coin.symbol.toUpperCase()})
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
                <Button variant="danger" onClick={() => removeFromPortfolio(coin.id)}>
                  Remover
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Portfolio;
