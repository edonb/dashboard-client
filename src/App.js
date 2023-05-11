import React, { useState, useEffect } from 'react';
import "./App.css"
import Weather from './components/Weather';
import News from './components/News';
import Greet from './components/Greet';
import Crypto from './components/Crypto';
import ExchangeRate from './components/ExchangeRate';
import Radio from './components/Radio';

function App() {
  const [usdNok, setUsdNok] = useState(null);
  const [eurNok, setEurNok] = useState(null);

  const serverUrl = "http://192.168.0.162:5000";
  const cryptoApiUrl = `${serverUrl}/crypto`;
  const exchangeApiUrl = `${serverUrl}/exchange`;

  const symbols = {
    btc: "BTCUSDT",
    eth: "ETHUSDT",
    ltc: "LTCUSDT"
  };

  const previousPrices = {
    btc: null,
    eth: null,
    ltc: null
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 600000); // 600000 milliseconds = 10 minutes

    return () => clearTimeout(timer); // This function gets called on unmount
  }, []);

  return (
    <>
      <div className='container'>
        <div className='news-feed'>
          <Greet />
          <Radio />
          <div className='crypto-box'>
            <Crypto serverUrl={serverUrl} />
            <ExchangeRate serverUrl={serverUrl} />
          </div>
          <div className='weather-marquee'>
            <Weather serverUrl={serverUrl} />
          </div>
        </div>
        <News serverUrl={serverUrl} />
      </div>
    </>
  );
}

export default App;
