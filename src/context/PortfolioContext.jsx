import React, { createContext, useState } from 'react';

export const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState([]);

  const addToPortfolio = (coin) => {
    setPortfolio((prev) => [...prev, coin]);
  };

  const removeFromPortfolio = (id) => {
    setPortfolio((prev) => prev.filter((coin) => coin.id !== id));
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, addToPortfolio, removeFromPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}
