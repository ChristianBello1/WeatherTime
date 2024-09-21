import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import HourlyWeatherCarousel from './components/HourlyWeatherCarousel';
import WeeklyWeatherDisplay from './components/WeeklyWeatherDisplay';
import CurrentWeatherDisplay from './components/CurrentWeatherDisplay';
import WeatherMetrics from './components/WeatherMetrics';
import WeatherBackground from './components/WeatherBackground';
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [weatherMetrics, setWeatherMetrics] = useState(null);
  const [error, setError] = useState(null);
  const [isDay, setIsDay] = useState(true);

  const fetchWeather = async (cityName) => {
    try {
      // Prima, otteniamo le coordinate della città
      const geocodingResponse = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: cityName,
          format: 'json',
          limit: 1,
        }
      });

      if (geocodingResponse.data.length === 0) {
        throw new Error('Città non trovata');
      }

      const { lat, lon } = geocodingResponse.data[0];

      // Ora usiamo queste coordinate per ottenere i dati meteo
      const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          hourly: 'temperature_2m,weathercode,apparent_temperature,relative_humidity_2m,wind_speed_10m,surface_pressure,visibility',
          daily: 'temperature_2m_max,temperature_2m_min,weathercode,uv_index_max',
          timezone: 'auto',
        }
      });

      const { hourly, daily } = weatherResponse.data;
      console.log('Weather API Response:', weatherResponse.data);


      if (!hourly || !daily) {
        throw new Error('Dati orari o giornalieri non disponibili nella risposta dell\'API');
      }

      // Il resto della logica di elaborazione dei dati rimane lo stesso
      const now = new Date();
      const nowHour = now.getHours();
      const nowMinute = now.getMinutes();
      const hourlyTimes = hourly.time.map(time => new Date(time).getHours());
      let startIndex = hourlyTimes.findIndex(hour => hour > nowHour || (hour === nowHour && nowMinute <= 59));
      if (startIndex === -1) startIndex = 0;

      const hourlyWeather = hourly.time.slice(startIndex, startIndex + 24).map((time, index) => ({
        time: new Date(time),
        temperature: hourly.temperature_2m[startIndex + index],
        weathercode: hourly.weathercode[startIndex + index],
        apparentTemperature: hourly.apparent_temperature[startIndex + index],
        relativeHumidity: hourly.relative_humidity_2m[startIndex + index],
        windSpeed: hourly.wind_speed_10m[startIndex + index],
        surfacePressure: hourly.surface_pressure[startIndex + index],
        visibility: hourly.visibility[startIndex + index],
      }));

      const dailyWeather = daily.time.map((date, index) => ({
        date: date,
        weathercode: daily.weathercode[index],
        temp_min: daily.temperature_2m_min[index],
        temp_max: daily.temperature_2m_max[index],
        uvIndex: daily.uv_index_max[index],
      }));

      const currentWeather = hourlyWeather[0] || { temperature: 'N/A', weathercode: 'N/A' };

      const sunriseHour = 6;
      const sunsetHour = 18;
      const currentIsDay = (nowHour >= sunriseHour && nowHour < sunsetHour); // Simple day/night calculation
      

      setCurrentWeather({
        temperature: currentWeather.temperature,
        weathercode: currentWeather.weathercode,
        temp_min: dailyWeather[0]?.temp_min || 'N/A',
        temp_max: dailyWeather[0]?.temp_max || 'N/A',
      });

      setWeatherMetrics({
        uvIndex: dailyWeather[0]?.uvIndex || 'N/A',
        apparentTemperature: hourlyWeather[0]?.apparentTemperature || 'N/A',
        relativeHumidity: hourlyWeather[0]?.relativeHumidity || 'N/A',
        windSpeed: hourlyWeather[0]?.windSpeed || 'N/A',
        surfacePressure: hourlyWeather[0]?.surfacePressure || 'N/A',
        visibility: hourlyWeather[0]?.visibility || 'N/A',
      });

      setHourlyWeather(hourlyWeather);
      setDailyWeather(dailyWeather);
      setIsDay(currentIsDay);
      setError(null);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Errore nel recupero dei dati meteo: ' + err.message);
      setCurrentWeather(null);
      setWeatherMetrics(null);
      setHourlyWeather([]);
      setDailyWeather([]);
    }
  };

  return (
    <div className="App">
      <WeatherBackground 
        weathercode={currentWeather ? currentWeather.weathercode : null} 
        isDay={isDay} 
      />
      <SearchBar onSearch={fetchWeather} />
      {error && <div className="error">{error}</div>}
      {currentWeather && <CurrentWeatherDisplay currentWeather={currentWeather} />}
      {hourlyWeather.length > 0 && <HourlyWeatherCarousel hourlyWeather={hourlyWeather} />}
      {dailyWeather.length > 0 && <WeeklyWeatherDisplay dailyWeather={dailyWeather} />}
      {weatherMetrics && <WeatherMetrics metrics={weatherMetrics} />}
    </div>
  );
}

export default App;