import React, { useEffect, useState } from 'react';

function Crypto({ serverUrl }) {
  const [prices, setPrices] = useState({btc: null, eth: null, ltc: null, usd: null, eur: null});
  const cryptoApiUrl = `${serverUrl}/crypto`;

  const getCurrencyImage = (currency) => {
    switch (currency) {
      case 'btc':
        return 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025';
      case 'eth':
        return 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025';
      case 'ltc':
        return 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=025'; 
      case 'usd':
        return 'https://www.svgrepo.com/show/367253/usd.svg';
      case 'eur':
        return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/eur.svg';
      default:
        return null;
    }
  };

  async function fetchData() {
    const response = await fetch(cryptoApiUrl);
    const data = await response.json();

    const newPrices = data.reduce((acc, { symbol, price }) => {
      if (symbol === 'BTCUSDT') acc.btc = Number(price);
      else if (symbol === 'ETHUSDT') acc.eth = Number(price);
      else if (symbol === 'LTCUSDT') acc.ltc = Number(price);
      else if (symbol === 'USD') acc.usd = Number(price);
      else if (symbol === 'EUR') acc.eur = Number(price);
      return acc;
    }, {});

    setPrices(newPrices);
  }

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 400000); // 6.66 minutes

    return () => clearInterval(intervalId);
  }, []);

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
