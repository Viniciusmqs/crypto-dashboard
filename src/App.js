import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import CryptoList from './components/CryptoList';
import CryptoDetails from './components/CryptoDetails';
import Portfolio from './components/Portfolio';
import Header from './components/Header';

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<CryptoList />} />
            <Route path="/moeda/:id" element={<CryptoDetails />} />
            <Route path="/carteira" element={<Portfolio />} />
          </Routes>
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
