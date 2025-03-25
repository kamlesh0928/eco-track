const express = require('express');
const cors = require("cors");
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

const allowedOrigins = [
    "http://localhost:5173"
  ];
  
  app.use(cors({
    origin: allowedOrigins,
    methods: "GET,POST,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
  }));
  
  app.options("*", (req, res) => res.sendStatus(204));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("I am the Root");
});

app.use('/api', weatherRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
