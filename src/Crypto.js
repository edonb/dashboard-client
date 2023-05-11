import React, { useEffect, useState } from 'react';

function Crypto({ serverUrl }) {
  const [prices, setPrices] = useState({btc: null, eth: null, ltc: null});
  const cryptoApiUrl = `${serverUrl}/crypto`;
  const symbols = {
    btc: "BTCUSDT",
    eth: "ETHUSDT",
    ltc: "LTCUSDT"
  };

  const getCurrencyImage = (currency) => {
    switch (currency) {
      case 'btc':
        return 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025';
      case 'eth':
        return 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025';
      case 'ltc':
        return 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=025'; 
      default:
        return null;
    }
  };

  async function fetchData(symbol) {
    const response = await fetch(`${cryptoApiUrl}/${symbol}`);
    const { lastPrice } = await response.json();
    return Number(lastPrice);
  }

  useEffect(() => {
    async function updatePrices() {
      const newPrices = {};
      for (const currency in symbols) {
        newPrices[currency] = await fetchData(symbols[currency]);
      }
      setPrices(newPrices);
    }

    updatePrices();
    const intervalId = setInterval(updatePrices, 400000); // 6.66 minutes

    return () => clearInterval(intervalId);
  }, []);

  // Render the price data
  return (
    <>
      {Object.entries(prices).map(([currency, price]) => (
        <div className='card' key={currency}>
          <img src={getCurrencyImage(currency)} alt={currency.toUpperCase()} />
           {price !== null ? `$ ${price.toFixed(2)}` : 'Loading...'}
        </div>
      ))}
    </>
  );
}


export default Crypto;
