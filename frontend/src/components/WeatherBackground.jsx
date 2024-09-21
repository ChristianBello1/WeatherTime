import React, { useState, useEffect } from 'react';
import './WeatherBackground.css';

const WeatherBackground = ({ weathercode, isDay }) => {
  const [videoSrc, setVideoSrc] = useState('/videos/default.mp4');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (weathercode !== null && isDay !== null) {
      setIsTransitioning(true);
      setTimeout(() => {
        setVideoSrc(getVideoSource(weathercode, isDay));
        setIsTransitioning(false);
      }, 500);
    }
  }, [weathercode, isDay]);

  const getVideoSource = (code, isDay) => {
    const videoMap = {
      0: isDay ? '/videos/clear_day.mp4' : '/videos/clear_night.mp4',
      1: isDay ? '/videos/clear_day.mp4' : '/videos/clear_night.mp4',
      2: isDay ? '/videos/cloudy_day.mp4' : '/videos/cloudy_night.mp4',
      3: isDay ? '/videos/cloudy_day.mp4' : '/videos/cloudy_night.mp4',
      45: "/videos/fog.mp4",
      48: "/videos/fog.mp4",
      51: isDay ? "/videos/rain_day.mp4" : "/videos/rain_night.mp4",
      53: isDay ? "/videos/rain_day.mp4" : "/videos/rain_night.mp4",
      55: isDay ? "/videos/rain_day.mp4" : "/videos/rain_night.mp4",
      61: isDay ? "/videos/rain_day.mp4" : "/videos/rain_night.mp4",
      63: isDay ? "/videos/rain_day.mp4" : "/videos/rain_night.mp4",
      65: isDay ? "/videos/rain_day.mp4" : "/videos/rain_night.mp4",
      71: isDay ? "/videos/snow_day.mp4" : "/videos/snow_night.mp4",
      73: isDay ? "/videos/snow_day.mp4" : "/videos/snow_night.mp4",
      75: isDay ? "/videos/snow_day.mp4" : "/videos/snow_night.mp4",
    };

    return videoMap[code] || '/videos/default.mp4';
  };

  return (
    <div className={`weather-background ${isTransitioning ? 'transitioning' : ''}`}>
      <video key={videoSrc} autoPlay loop muted className="background-video">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default WeatherBackground;