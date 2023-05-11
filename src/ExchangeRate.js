import React, { useEffect, useState } from 'react';

function ExchangeRate({ serverUrl }) {
  const [usdNok, setUsdNok] = useState(null);
  const [eurNok, setEurNok] = useState(null);
  const exchangeApiUrl = `${serverUrl}/exchange`;

  async function fetchRate(currency) {
    const response = await fetch(`${exchangeApiUrl}/${currency}`);
    const data = await response.json();
    return data.rates.NOK;
  }

  useEffect(() => {
    async function updateRates() {
      const usdToNokRate = await fetchRate('USD');
      setUsdNok(usdToNokRate);
      const euroToNokRate = await fetchRate('EUR');
      setEurNok(euroToNokRate);
    }

    updateRates();
  }, []);

  // Map currency codes to image URLs
  const getCurrencyLogo = (currency) => {
    switch (currency) {
      case 'USD':
        return 'https://www.svgrepo.com/show/367253/usd.svg';
      case 'EUR':
        return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/eur.svg';
      default:
        return 'https://www.svgrepo.com/show/367253/usd.svg';
    }
  };

  return (
      <>
      <div className='card'>
        <img src={getCurrencyLogo('USD')} alt='USD Logo' />
        {usdNok !== null ? `${usdNok.toFixed(2)} NOK` : 'Loading...'}
      </div>
      <div className='card'>
        <img src={getCurrencyLogo('EUR')} alt='EUR Logo' />
        {eurNok !== null ? `${eurNok.toFixed(2)} NOK` : 'Loading...'}
      </div>
    </>
  );
}


export default ExchangeRate;
