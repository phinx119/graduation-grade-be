require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./models/db');
const dataRoutes = require('./routes/data.routes');

const app = express();
const port = 3000;

app.use(express.json()); // for parsing JSON bodies

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

// Allow all origins (for development)
app.use(cors());

// OR: restrict to specific origin (recommended for production)
// app.use(cors({
//   origin: 'http://localhost:3000', // frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

app.use('/api/data', dataRoutes); // CRUD endpoints

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
    });
});