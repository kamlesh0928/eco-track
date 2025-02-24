require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("I am the Root");
});

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
})