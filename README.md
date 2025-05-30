# Movie Ticket Booking Application

A full-stack web application for booking movie tickets, inspired by BookMyShow. This application allows users to select movies, choose time slots, and book seats for their preferred shows.

## Project Structure

The project consists of three main components:

1. **Frontend Server (React)**
   - Runs on port 3000
   - Built with React.js
   - Handles user interface and interactions

2. **Backend Server (Express/Vercel Serverless)**
   - Runs on port 8080 (local) or as Vercel serverless functions
   - Built with Node.js and Express/Vercel API routes
   - Handles API requests and business logic

3. **Database Server (MongoDB)**
   - MongoDB Atlas or local MongoDB instance
   - Stores booking information

## API Endpoints

### Backend API (http://localhost:8080 or https://your-vercel-app.vercel.app)

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

### Local Development

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

2. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies (for local development)
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add MongoDB connection string:
     ```
     MONGO_URI=mongodb://localhost:27017/moviebooking
     # or for MongoDB Atlas:
     # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/moviebooking
     ```

4. **Start the Servers**
   ```bash
   # For local development with traditional Express server
   # Start MongoDB (if using local)
   mongod

   # Start backend server
   cd backend
   npm start

   # Start frontend server
   cd ../frontend
   npm start
   ```

### Vercel Deployment

1. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

2. **Environment Variables in Vercel**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add environment variable:
     - Name: `MONGO_URI`
     - Value: Your MongoDB connection string

3. **API Access**
   - Your API will be available at: `https://your-app-name.vercel.app/api/booking`
   - Update your frontend to use this URL instead of localhost:8080

## Technologies Used

- **Frontend**
  - React.js
  - HTML5
  - CSS3
  - JavaScript

- **Backend**
  - Node.js
  - Express.js (local) / Vercel Serverless Functions (production)
  - MongoDB
  - Mongoose

## Development Guidelines

1. **Frontend Development**
   - All movie names, slots, and seat types are hardcoded in `data.js`
   - Use proper class names for styling
   - Implement localStorage for selection persistence
   - Handle all fetch requests through proxy to localhost:8080 (local) or direct to Vercel API (production)

2. **Backend Development**
   - Follow the provided schema for database structure
   - Implement proper error handling
   - Validate all incoming requests
   - For Vercel: Use serverless functions in the `/api` directory

## Project Structure

```
├── api/
│   └── booking.js          # Vercel serverless API route
├── backend/
│   ├── index.js            # Traditional Express server (for local dev)
│   ├── connector.js        # MongoDB connection
│   ├── schema.js           # Database schema
│   └── package.json        # Backend dependencies
├── frontend/
│   └── [React app files]
├── package.json            # Root dependencies for Vercel
├── vercel.json            # Vercel configuration
└── README.md
```

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