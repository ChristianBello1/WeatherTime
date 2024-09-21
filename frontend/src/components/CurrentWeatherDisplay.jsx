// src/components/CurrentWeatherDisplay.jsx
import React from 'react';
import './CurrentWeatherDisplay.css';

function CurrentWeatherDisplay({ currentWeather }) {
  const { temperature, weathercode, temp_min, temp_max } = currentWeather;

  return (
    <div className="current-weather-display">
      <div className="current-weather-temp">
        <h1>{Math.round(temperature)}°</h1>
        <p>{getWeatherCondition(weathercode)} {Math.round(temp_min)}°/ {Math.round(temp_max)}°</p>
      </div>
    </div>
  );
}

// Funzione per ottenere la condizione meteo dal codice
function getWeatherCondition(weathercode) {
  const weatherConditions = {
    0: "Clear",
    1: "Mostly Clear",
    2: "Partly Cloudy",
    3: "Cloudy",
    45: "Fog",
    48: "Freezing Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Heavy Drizzle",
    61: "Light Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Light Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
  };

  return weatherConditions[weathercode] || "Condizione Sconosciuta";
}

export default CurrentWeatherDisplay;
