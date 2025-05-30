const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { bookMovieSchema } = require('./backend/schema');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
let BookingModel;

async function connectToDatabase() {
    if (!BookingModel) {
        try {
            await mongoose.connect(mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Connected to MongoDB");
            BookingModel = mongoose.model('bookmovietickets', bookMovieSchema);
        } catch (error) {
            console.error("MongoDB connection error:", error);
            throw error;
        }
    }
    return BookingModel;
}

// Initialize database connection
connectToDatabase().catch(console.error);

// POST /api/booking - Save a new booking
app.post('/api/booking', async (req, res) => {
    try {
        const connection = await connectToDatabase();
        const { movie, seats, slot } = req.body;
        
        if (!movie || !seats || !slot) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        await connection.create({ movie, seats, slot });
        return res.status(200).json({ message: 'Booking successful' });
    } catch (err) {
        console.error("Error creating booking:", err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/booking - Return the last booking
app.get('/api/booking', async (req, res) => {
    try {
        const connection = await connectToDatabase();
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
        console.error("Error fetching booking:", err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// 404 handler for all other endpoints
app.use((req, res) => {
    res.status(404).json({ message: 'Invalid endpoint' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app; 