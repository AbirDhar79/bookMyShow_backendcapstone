const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const path = require('path')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { connection } = require("./connector");
const cors = require('cors')
app.use(cors())

// POST /api/booking - Save a new booking
app.post('/api/booking', async (req, res) => {
    try {
        const { movie, seats, slot } = req.body;
        if (!movie || !seats || !slot) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // Save booking
        await connection.create({ movie, seats, slot });
        return res.status(200).json({ message: 'Booking successful' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/booking - Return the last booking
app.get('/api/booking', async (req, res) => {
    try {
        const lastBooking = await connection.findOne({}, {}, { sort: { _id: -1 } });
        if (!lastBooking) {
            return res.json({ message: 'no previous booking found' });
        }
        return res.json({
            movie: lastBooking.movie,
            seats: lastBooking.seats,
            slot: lastBooking.slot
        });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// 404 handler for all other endpoints
app.use((req, res) => {
    res.status(404).json({ message: 'Invalid endpoint' });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;   