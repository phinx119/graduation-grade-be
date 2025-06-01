require('dotenv').config();
const express = require('express');
const { connectDB } = require('./models/db');
const data2024Routes = require('./routes/data_2024.routes');

const app = express();
const port = 3000;

app.use(express.json()); // for parsing JSON bodies

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

app.use('/api/2024', data2024Routes); // CRUD endpoints

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
    });
});