import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StocksComponent() {
  const [stocksData, setStocksData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/stocks')
      .then(response => {
        setStocksData(response.data);
      })
      .catch(error => console.error('Error fetching stocks:', error));
  }, []);

  return (
    <div>
      <h1>Stocks</h1>
      <ul>
        {stocksData.length > 0 ? (
          stocksData.map((stock, index) => (
            <li key={index}>
              {stock.ticker}: {stock.price !== 'Error fetching data' ? `$${stock.price}` : stock.price}
            </li>
          ))
        ) : (
          <p>Loading stock data...</p>
        )}
      </ul>
    </div>
  );
}

export default StocksComponent;
