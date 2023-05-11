import React, { useState, useEffect } from 'react';
import "./Weather.css"




function Weather({ serverUrl }) {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      const locations = ['sarpsborg', 'oslo', 'copenhagen', 'nice', 'monaco'];
      const fetchPromises = locations.map(location =>
        fetch(`${serverUrl}/weather/${location}`)
          .then(response => response.json())
          .then(data => ({ location, data }))
      );
      const weatherData = await Promise.all(fetchPromises);
      const weatherObj = weatherData.reduce((obj, item) => {
        obj[item.location] = item.data;

        return obj;
      }, {});

      setWeather(weatherObj);
    };

    fetchWeather();
  }, [serverUrl]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getWeatherIcon = (symbolCode) => {
    console.log(symbolCode);
    let icon;
    switch (symbolCode) {

      case 'clearsky_day':
        icon = 'wi-day-sunny';
        break;
      case 'clearsky_night':
        icon = 'wi-night-clear';
        break;
      case 'cloudy':
        icon = 'wi-cloudy';
        break;
      case 'fair_day':
        icon = 'wi-day-cloudy';
        break;
      case 'fair_night':
        icon = 'wi-night-alt-cloudy';
        break;
      case 'fog':
        icon = 'wi-fog';
        break;
      case 'heavyrain':
        icon = 'wi-rain';
        break;
      case 'heavyrainandthunder':
        icon = 'wi-thunderstorm';
        break;
      case 'heavyrainshowers_day':
        icon = 'wi-day-showers';
        break;
      case 'heavyrainshowers_night':
        icon = 'wi-night-alt-showers';
        break;
      case 'lightrain':
        icon = 'wi-sprinkle';
        break;
      case 'lightrainandthunder':
        icon = 'wi-storm-showers';
        break;
      case 'lightrainshowers_day':
        icon = 'wi-day-sprinkle';
        break;
      case 'lightrainshowers_night':
        icon = 'wi-night-alt-sprinkle';
        break;
      case 'partlycloudy_day':
        icon = 'wi-day-cloudy-high';
        break;
      case 'partlycloudy_night':
        icon = 'wi-night-alt-cloudy-high';
        break;
      case 'rain':
        icon = 'wi-rain';
        break;
      case 'rainandthunder':
        icon = 'wi-thunderstorm';
        break;
      case 'rainshowers_day':
        icon = 'wi-day-showers';
        break;
      case 'rainshowers_night':
        icon = 'wi-night-alt-showers';
        break;
      case 'sleet':
        icon = 'wi-sleet';
        break;
      case 'sleetandthunder':
        icon = 'wi-storm-showers';
        break;
      case 'sleetshowers_day':
        icon = 'wi-day-sleet-storm';
        break;
      case 'sleetshowers_night':
        icon = 'wi-night-alt-sleet-storm';
        break;
      case 'snow':
        icon = 'wi-snow';
        break;
      case 'snowandthunder':
        icon = 'wi-snow-thunderstorm';
        break;
      case 'snowshowers_day':
        icon = 'wi-day-snow';
        break;
      case 'snowshowers_night':
        icon = 'wi-night-alt-snow';
        break;
      default:
        icon = 'wi-na';
        break;
    }
    return <i className={`wi ${icon}`}></i>;

  };
  

  if (!Object.keys(weather).length) return <div>Loading weather...</div>;
  console.log(weather); // Add this line

  
  return (
<div className="weather-items">
  {Object.keys(weather).map(location => (
    <div className="weather-item" key={location}>
      <h2>{capitalizeFirstLetter(location)}</h2>
      <>{weather[location].temperature}°C </>
      {weather[location].symbolCode ? getWeatherIcon(weather[location].symbolCode) : 'NaN'}
    </div>
  ))}
</div>

  );
}

export default Weather;
