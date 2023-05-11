import React, { useState, useEffect } from 'react';
import "./App.css"
import Weather from './Weather';
import News from './News';
import Greet from './Greet';
import Crypto from './Crypto';
import ExchangeRate from './ExchangeRate';
import Radio from './Radio';

function App() {
  const [usdNok, setUsdNok] = useState(null);
  const [eurNok, setEurNok] = useState(null);

  const serverUrl = "http://192.168.1.165:5000";
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
