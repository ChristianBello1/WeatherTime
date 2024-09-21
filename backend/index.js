// index.js (backend)
import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weatherRoutes.js';
import listEndpoints from "express-list-endpoints";

const app = express();
const PORT = 3000;

// Middleware per abilitare il CORS
app.use(cors());

// Middleware per parsing JSON
app.use(express.json());

// Usa le rotte del meteo
app.use('/api', weatherRoutes);

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
    console.log("Rotte disponibili:");
    console.table(
      listEndpoints(app).map((route) => ({
        path: route.path,
        methods: route.methods.join(", "),
      }))
    );
  });