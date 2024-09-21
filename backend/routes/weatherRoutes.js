// routes/weatherRoutes.js
import express from 'express';
import { getWeatherByCity } from '../controllers/weatherController.js'; // Importiamo la funzione dal controller

const router = express.Router();

// Definizione della rotta per ottenere il meteo di una città
router.get('/weather/:city', getWeatherByCity);

export default router;

