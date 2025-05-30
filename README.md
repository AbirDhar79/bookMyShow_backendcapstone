# Movie Ticket Booking Application

A full-stack web application for booking movie tickets, inspired by BookMyShow. This application allows users to select movies, choose time slots, and book seats for their preferred shows.

## Project Structure

The project consists of three main components:

1. **Frontend Server (React)**
   - Runs on port 3000
   - Built with React.js
   - Handles user interface and interactions

2. **Backend Server (Express)**
   - Runs on port 8080
   - Built with Node.js and Express
   - Handles API requests and business logic

3. **Database Server (MongoDB)**
   - Local MongoDB instance
   - Stores booking information

## API Endpoints

### Backend API (http://localhost:8080)

1. **Create Booking**
   - Endpoint: `/api/booking`
   - Method: POST
   - Body:
     ```json
     {
       "movie": "movie-name",
       "seats": {
         "A1": "number",
         "A2": "number",
         ...
         "D2": "number"
       },
       "slot": "time-slot"
     }
     ```
   - Returns: 200 status code on successful booking

2. **Get Last Booking**
   - Endpoint: `/api/booking`
   - Method: GET
   - Returns: Last booking details or `{message: "no previous booking found"}`

## Features

- Movie selection from available options
- Time slot selection
- Seat type selection with quantity input
- Real-time booking updates
- Last booking details display
- Persistent selection using localStorage
- Responsive design

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

2. **Install Dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the backend directory
   - Add MongoDB connection string:
     ```
     MONGO_URI=mongodb://localhost:27017/moviebooking
     ```

4. **Start the Servers**
   ```bash
   # Start MongoDB (if not running)
   mongod

   # Start backend server
   cd backend
   npm start

   # Start frontend server
   cd ../client
   npm start
   ```

## Technologies Used

- **Frontend**
  - React.js
  - HTML5
  - CSS3
  - JavaScript

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

## Development Guidelines

1. **Frontend Development**
   - All movie names, slots, and seat types are hardcoded in `data.js`
   - Use proper class names for styling
   - Implement localStorage for selection persistence
   - Handle all fetch requests through proxy to localhost:8080

2. **Backend Development**
   - Follow the provided schema for database structure
   - Implement proper error handling
   - Validate all incoming requests

## Testing

The application includes test files:
- `test-api.js` for API testing
- `test-setup.js` for test configuration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 