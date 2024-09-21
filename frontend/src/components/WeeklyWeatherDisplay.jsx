import React from 'react';
import './WeeklyWeatherDisplay.css';

function WeeklyWeatherDisplay({ dailyWeather }) {
  console.log('WeeklyWeatherDisplay data:', dailyWeather);

  if (!dailyWeather || dailyWeather.length === 0) {
    return <div className="error-message">Dati meteo non disponibili</div>;
  }

  return (
    <div className="weekly-weather-container">
      <div className="weekly-weather-header">
        <div className="header-col">Data</div>
        <div className="header-col">Condizioni</div>
        <div className="header-col">Temp Min/Max</div>
      </div>
      {dailyWeather.map((day, index) => (
        <div key={index} className="weekly-weather-row">
          <div className="weekly-weather-date">{formatDate(day.date)}</div>
          <div className="weekly-weather-icon">
            <img src={getWeatherIcon(day.weathercode)} alt="weather-icon" />
          </div>
          <div className="weekly-weather-temp">
            {Math.round(day.temp_min)}°C / {Math.round(day.temp_max)}°C
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: '2-digit', month: 'short', weekday: 'short' };
  return date.toLocaleDateString('en-EN', options);
}

function getWeatherIcon(weathercode) {
  const icons = {
    0: "/icons/sunny.png", // Sereno
    1: "/icons/mostly_sunny.png", // Principalmente Sereno
    2: "/icons/partly_cloudy.png", // Parzialmente Nuvoloso
    3: "/icons/cloudy.png", // Nuvoloso
    45: "/icons/fog.png", // Nebbia
    48: "/icons/frozen_fog.png", // Nebbia Gelata
    51: "/icons/light_drizzle.png", // Pioviggine Leggera
    53: "/icons/moderate_drizzle.png", // Pioviggine Moderata
    55: "/icons/heavy_drizzle.png", // Pioviggine Densa
    61: "/icons/light_rain.png", // Pioggia Leggera
    63: "/icons/moderate_rain.png", // Pioggia Moderata
    65: "/icons/heavy_rain.png", // Pioggia Forte
    71: "/icons/light_snow.png", // Neve Leggera
    73: "/icons/moderate_snow.png", // Neve Moderata
    75: "/icons/heavy_snow.png", // Neve Intensa
  };

  return icons[weathercode] || "/icons/light_rain.png";
}

export default WeeklyWeatherDisplay;