import React from 'react';
import { format } from 'date-fns';

function ForecastCard({ forecastData }) {
  if (!forecastData || forecastData.length === 0) {
    return <p>No forecast data available.</p>;
  }

  if (!Array.isArray(forecastData)) {
    return <p>Invalid forecast data format.</p>;
  }

  const containerStyle = {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    maxWidth: '800px',
    margin: '20px auto',
    textAlign: 'center'
  };

  const headerStyle = {
    fontSize: '1.8rem',
    marginBottom: '20px',
    color: '#333'
  };

  const forecastCardsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '10px'
  };

  const forecastCardStyle = {
    flex: '1 1 150px',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const dateStyle = {
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  const iconStyle = {
    width: '60px',
    height: '60px'
  };

  const tempStyle = {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    margin: '5px 0'
  };

  const conditionStyle = {
    fontSize: '0.9rem',
    color: '#555',
    textTransform: 'capitalize'
  };

  // Filter for unique days (at noon) - taking one forecast item per day
  const getDailyForecasts = (data) => {
    const dailyData = [];
    const processedDates = new Set();

    for (const item of data) {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toDateString();

      if (!processedDates.has(dateStr)) {
        processedDates.add(dateStr);
        dailyData.push(item);

        // Stop after collecting 5 days
        if (dailyData.length === 5) break;
      }
    }

    return dailyData;
  };

  const dailyForecasts = getDailyForecasts(forecastData);

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>5-Day Forecast</h2>
      <div style={forecastCardsStyle}>
        {dailyForecasts.map((day, index) => {
          // Check if the required properties exist before using them
          if (!day || !day.dt || !day.main || !day.weather || !day.weather[0]) {
            return null; // Skip if data is incomplete
          }

          // Extract data using the same format as WeatherCard
          const date = new Date(day.dt * 1000);
          const temp = Math.round(day.main.temp); // Already in Celsius from API
          const condition = day.weather[0].main;
          const description = day.weather[0].description;
          const icon = day.weather[0].icon;
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

          return (
            <div key={index} style={forecastCardStyle}>
              <p style={dateStyle}>{format(date, 'EEE, MMM d')}</p>
              <img src={iconUrl} alt="Weather Icon" style={iconStyle} />
              <p style={tempStyle}>{temp}°C</p>
              <p style={conditionStyle}>{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastCard;
