import axios from 'axios';

export const getWeatherByCity = async (req, res) => {
  const cityName = req.params.city;
  try {
    // Ottieni latitudine e longitudine tramite Geocoding API (puoi integrare un servizio di geocodifica)
    const geoResponse = await axios.get(`https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`);
    const { lat, lon } = geoResponse.data[0];

    // Chiama l'API di Open Meteo per ottenere meteo attuale e previsioni orarie
    const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode`);

    res.json({
      latitude: lat,
      longitude: lon,
      current_weather: weatherResponse.data.current_weather,
      hourly: weatherResponse.data.hourly
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei dati meteo' });
  }
};
