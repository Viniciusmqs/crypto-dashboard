import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chart from './Chart';
import { Spinner, Card, Row, Col, Badge } from 'react-bootstrap';

function CryptoDetails() {
  const { id } = useParams(); // ID da moeda na URL
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], prices: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        // 🔁 1. Dados detalhados da moeda
        const coinRes = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);

        // 🔁 2. Histórico de preços (últimos 7 dias)
        const marketRes = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: 7,
              interval: 'daily'
            }
          }
        );

        // 🧠 Mapeia os dados do gráfico
        const labels = marketRes.data.prices.map(price => {
          const date = new Date(price[0]);
          return `${date.getDate()}/${date.getMonth() + 1}`;
        });

        const prices = marketRes.data.prices.map(price => price[1]);

        setCoin(coinRes.data);
        setChartData({ labels, prices });
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar detalhes da moeda:', err);
      }
    }

    fetchDetails();
  }, [id]);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div>
      <h2 className="mb-4 text-center">{coin.name} ({coin.symbol.toUpperCase()})</h2>
      <Row className="mb-4">
        <Col md={4} className="text-center">
          <img src={coin.image.large} alt={coin.name} width="100" />
        </Col>
        <Col md={8}>
          <Card className="p-3 shadow-sm">
            <p><strong>Preço Atual:</strong> ${coin.market_data.current_price.usd.toLocaleString()}</p>
            <p><strong>Capitalização de Mercado:</strong> ${coin.market_data.market_cap.usd.toLocaleString()}</p>
            <p><strong>Volume 24h:</strong> ${coin.market_data.total_volume.usd.toLocaleString()}</p>
            <p>
              <strong>Variação 24h:</strong>{' '}
              <Badge bg={coin.market_data.price_change_percentage_24h >= 0 ? 'success' : 'danger'}>
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </Badge>
            </p>
          </Card>
        </Col>
      </Row>

      <h4 className="text-center mb-3">📈 Variação nos Últimos 7 Dias</h4>
      <Chart labels={chartData.labels} prices={chartData.prices} />
    </div>
  );
}

export default CryptoDetails;
