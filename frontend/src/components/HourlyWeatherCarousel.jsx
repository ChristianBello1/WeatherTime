import React, { useRef, useState, useEffect } from 'react';
import './HourlyWeatherCarousel.css';

function HourlyWeatherCarousel({ hourlyWeather }) {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
    carouselRef.current.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    carouselRef.current.style.cursor = 'grab';
    carouselRef.current.style.removeProperty('user-select');
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  const handleWheel = (e) => {
    const container = carouselRef.current;
    const containerScrollPosition = container.scrollLeft;
    const containerScrollWidth = container.scrollWidth;
    const containerWidth = container.clientWidth;

    const isAtLeftEdge = containerScrollPosition === 0;
    const isAtRightEdge = containerScrollPosition + containerWidth >= containerScrollWidth;

    if ((isAtLeftEdge && e.deltaY < 0) || (isAtRightEdge && e.deltaY > 0)) {
      return;
    }

    e.preventDefault();
    container.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  return (
    <div
      className="carousel-container"
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {hourlyWeather.map((hour, index) => (
        <div key={index} className="carousel-item">
          <p>{index === 0 ? "Now" : `${hour.time.getHours()}:${hour.time.getMinutes().toString().padStart(2, '0')}`}</p>
          <img src={getWeatherIcon(hour.weathercode)} alt="weather-icon" />
          <p>{hour.temperature}°C</p>
        </div>
      ))}
    </div>
  );
}

function getWeatherIcon(weathercode) {
  const icons = {
    0: "/icons/sunny.png",
    1: "/icons/mostly_sunny.png",
    2: "/icons/partly_cloudy.png",
    3: "/icons/cloudy.png",
    45: "/icons/fog.png",
    48: "/icons/frozen_fog.png",
    51: "/icons/light_drizzle.png",
    53: "/icons/moderate_drizzle.png",
    55: "/icons/heavy_drizzle.png",
    61: "/icons/light_rain.png",
    63: "/icons/moderate_rain.png",
    65: "/icons/heavy_rain.png",
    71: "/icons/light_snow.png",
    73: "/icons/moderate_snow.png",
    75: "/icons/heavy_snow.png",
  };

  return icons[weathercode] || "/icons/moderate_rain.png";
}

export default HourlyWeatherCarousel;