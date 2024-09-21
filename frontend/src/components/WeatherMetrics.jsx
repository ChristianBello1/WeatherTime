// src/components/WeatherMetrics.jsx
import React from 'react';
import './WeatherMetrics.css';

function WeatherMetrics({ metrics }) {
  const { uvIndex, apparentTemperature, relativeHumidity, windSpeed, surfacePressure, visibility } = metrics;

  return (
    <div className="weather-metrics">
      <div className="metric">
        <img src="./src/assets/sun.svg" alt="UV Index" className="metric-icon" />
        <p>UV Index</p>
        <span>{uvIndex}</span>
      </div>
      <div className="metric">
        <img src="./src/assets/thermometer.svg" alt="Apparent Temperature" className="metric-icon" />
        <p>Apparent Temperature</p>
        <span>{Math.round(apparentTemperature)}°C</span>
      </div>
      <div className="metric">
        <img src="./src/assets/droplet.svg" alt="Humidity" className="metric-icon" />
        <p>Humidity</p>
        <span>{Math.round(relativeHumidity)}%</span>
      </div>
      <div className="metric">
        <img src="./src/assets/wind.svg" alt="Wind Speed" className="metric-icon" />
        <p>Wind</p>
        <span>{Math.round(windSpeed)} km/h</span>
      </div>
      <div className="metric">
        <img src="./src/assets/arrow-down.svg" alt="Pressure" className="metric-icon" />
        <p>Atmospheric Pressure</p>
        <span>{Math.round(surfacePressure)} hPa</span>
      </div>
      <div className="metric">
        <img src="./src/assets/eye.svg" alt="Visibility" className="metric-icon" />
        <p>Visibility</p>
        <span>{Math.round(visibility)} km</span>
      </div>
    </div>
  );
}

export default WeatherMetrics;
