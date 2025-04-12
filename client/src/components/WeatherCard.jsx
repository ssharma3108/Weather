import React from 'react';

function WeatherCard({ data }) {
  const temp = Math.round(data.main?.temp);
  const feelsLike = Math.round(data.main?.feels_like);
  const tempMin = Math.round(data.main?.temp_min);
  const tempMax = Math.round(data.main?.temp_max);
  const condition = data.weather?.[0]?.main;
  const description = data.weather?.[0]?.description;
  const icon = data.weather?.[0]?.icon;
  const humidity = data.main?.humidity;
  const windSpeed = data.wind?.speed;
  const pressure = data.main?.pressure;
  const cityName = data.name;
  const country = data.sys?.country;

  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sunrise = formatTime(data.sys?.sunrise);
  const sunset = formatTime(data.sys?.sunset);

  const cardStyle = {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    maxWidth: '400px',
    margin: '20px auto',
    textAlign: 'center'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15px'
  };

  const tempStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '10px 0'
  };

  const conditionStyle = {
    fontSize: '1.2rem',
    marginBottom: '20px'
  };

  const detailsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px'
  };

  const detailItemStyle = {
    flex: 1,
    padding: '0 10px'
  };

  const labelStyle = {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    color: '#555'
  };

  return (
    <div style={cardStyle}>
      <h2>{cityName}, {country}</h2>
      <div style={headerStyle}>
        <img src={iconUrl} alt="Weather Icon" style={{ width: '80px', height: '80px' }} />
      </div>

      <div style={tempStyle}>{temp}°C</div>
      <div style={conditionStyle}>
        {condition} - {description}
        <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>Feels like: {feelsLike}°C</div>
      </div>

      <div style={detailsContainerStyle}>
        <div style={detailItemStyle}>
          <div style={labelStyle}>Min/Max</div>
          <div>{tempMin}°C / {tempMax}°C</div>
        </div>
        <div style={detailItemStyle}>
          <div style={labelStyle}>Humidity</div>
          <div>{humidity}%</div>
        </div>
      </div>

      <div style={detailsContainerStyle}>
        <div style={detailItemStyle}>
          <div style={labelStyle}>Wind Speed</div>
          <div>{windSpeed} m/s</div>
        </div>
        <div style={detailItemStyle}>
          <div style={labelStyle}>Pressure</div>
          <div>{pressure} hPa</div>
        </div>
      </div>

      <div style={detailsContainerStyle}>
        <div style={detailItemStyle}>
          <div style={labelStyle}>Sunrise</div>
          <div>{sunrise}</div>
        </div>
        <div style={detailItemStyle}>
          <div style={labelStyle}>Sunset</div>
          <div>{sunset}</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;