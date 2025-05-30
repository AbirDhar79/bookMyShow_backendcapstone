import React, { useState, useEffect } from "react";
import '../styles/App.css';
import '../styles/bootstrap.min.css';
import { movies, slots, seats } from './data';

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedSeats, setSelectedSeats] = useState({
    A1: 0, A2: 0, A3: 0, A4: 0, D1: 0, D2: 0
  });
  const [lastBooking, setLastBooking] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedMovie = localStorage.getItem('movie');
    const savedSlot = localStorage.getItem('slot');
    const savedSeats = localStorage.getItem('seats');

    if (savedMovie) setSelectedMovie(savedMovie);
    if (savedSlot) setSelectedSlot(savedSlot);
    if (savedSeats) setSelectedSeats(JSON.parse(savedSeats));

    // Fetch last booking on load
    fetchLastBooking();
  }, []);

  // Save to localStorage whenever selections change
  useEffect(() => {
    localStorage.setItem('movie', selectedMovie);
  }, [selectedMovie]);

  useEffect(() => {
    localStorage.setItem('slot', selectedSlot);
  }, [selectedSlot]);

  useEffect(() => {
    localStorage.setItem('seats', JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  const fetchLastBooking = async () => {
    try {
      const response = await fetch('/api/booking');
      const data = await response.json();
      setLastBooking(data);
    } catch (error) {
      console.error('Error fetching last booking:', error);
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSeatChange = (seatType, value) => {
    setSelectedSeats(prev => ({
      ...prev,
      [seatType]: parseInt(value) || 0
    }));
  };

  const isBookingValid = () => {
    const hasSeats = Object.values(selectedSeats).some(count => count > 0);
    return selectedMovie && selectedSlot && hasSeats;
  };

  const handleBooking = async () => {
    if (!isBookingValid()) return;

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movie: selectedMovie,
          slot: selectedSlot,
          seats: selectedSeats
        })
      });

      if (response.status === 200) {
        // Update last booking without making a new GET request
        setLastBooking({
          movie: selectedMovie,
          slot: selectedSlot,
          seats: selectedSeats
        });

        // Clear all selections
        setSelectedMovie('');
        setSelectedSlot('');
        setSelectedSeats({ A1: 0, A2: 0, A3: 0, A4: 0, D1: 0, D2: 0 });
        
        // Clear localStorage
        localStorage.removeItem('movie');
        localStorage.removeItem('slot');
        localStorage.removeItem('seats');
      }
    } catch (error) {
      console.error('Error making booking:', error);
    }
  };

  const renderLastBookingDetails = () => {
    if (!lastBooking || lastBooking.message === "no previous booking found") {
      return <p>no previous booking found</p>;
    }

    return (
      <div>
        <p><strong>Seats:</strong></p>
        {seats.map(seat => (
          <p key={seat}>{seat}: {lastBooking.seats[seat]}</p>
        ))}
        <p><strong>Slot:</strong> {lastBooking.slot}</p>
        <p><strong>Movie:</strong> {lastBooking.movie}</p>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <h1>Book that show!!</h1>
          
          {/* Movie Selection */}
          <div className="movie-row">
            <h3>Select A Movie</h3>
            {movies.map(movie => (
              <div
                key={movie}
                className={`movie-column ${selectedMovie === movie ? 'movie-column-selected' : ''}`}
                onClick={() => handleMovieSelect(movie)}
              >
                {movie}
              </div>
            ))}
          </div>

          {/* Slot Selection */}
          <div className="slot-row">
            <h3>Select a Time slot</h3>
            {slots.map(slot => (
              <div
                key={slot}
                className={`slot-column ${selectedSlot === slot ? 'slot-column-selected' : ''}`}
                onClick={() => handleSlotSelect(slot)}
              >
                {slot}
              </div>
            ))}
          </div>

          {/* Seat Selection */}
          <div className="seat-row">
            <h3>Select the seats</h3>
            {seats.map(seat => (
              <div
                key={seat}
                className={`seat-column ${selectedSeats[seat] > 0 ? 'seat-column-selected' : ''}`}
              >
                <h4>Type {seat}</h4>
                <input
                  type="number"
                  id={`seat-${seat}`}
                  min="0"
                  value={selectedSeats[seat]}
                  onChange={(e) => handleSeatChange(seat, e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Book Button */}
          <div className="book-button">
            <button
              onClick={handleBooking}
              disabled={!isBookingValid()}
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Last Booking Details - Right Side */}
        <div className="col-4">
          <div className="last-order">
            <h3>Last Booking Details:</h3>
            {renderLastBookingDetails()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
