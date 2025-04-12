import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const weatherResponse = await fetch(`http://localhost:5000/weather?city=${city}`);
      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }
      const weatherResult = await weatherResponse.json();
      setWeatherData(weatherResult);

      const forecastResponse = await fetch(`http://localhost:5000/weather/forecast?city=${city}`);
      if (!forecastResponse.ok) {
        throw new Error('Forecast data unavailable');
      }
      const forecastResult = await forecastResponse.json();
      setForecastData(forecastResult.list); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      {weatherData && <WeatherCard data={weatherData} />}
      {forecastData && <ForecastCard forecastData={forecastData} />}
    </div>
  );
}

export default App;