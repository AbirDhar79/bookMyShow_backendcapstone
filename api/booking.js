const mongoose = require('mongoose');
const { bookMovieSchema } = require('../backend/schema');

const mongoURI = process.env.MONGO_URI;

// Initialize MongoDB connection
let isConnected = false;
let BookingModel;

async function connectToDatabase() {
    if (isConnected && BookingModel) {
        return BookingModel;
    }

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log("Connected to MongoDB");
        isConnected = true;
        
        // Create or get the model
        BookingModel = mongoose.models.bookmovietickets || mongoose.model('bookmovietickets', bookMovieSchema);
        return BookingModel;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

export default async function handler(req, res) {
    try {
        const connection = await connectToDatabase();

        if (req.method === 'POST') {
            const { movie, seats, slot } = req.body;
            
            if (!movie || !seats || !slot) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            
            try {
                await connection.create({ movie, seats, slot });
                return res.status(200).json({ message: 'Booking successful' });
            } catch (err) {
                console.error("Error creating booking:", err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            
        } else if (req.method === 'GET') {
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
                console.error("Error fetching booking:", err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error("Handler error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
} 