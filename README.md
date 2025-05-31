# Book My Show - Movie Ticket Booking Website

A fullstack movie booking application inspired by BookMyShow, built with React frontend and Express.js backend.

## 🏗️ Project Structure

```
├── frontend/          # React frontend application (port 3000)
├── backend/           # Express.js backend API (port 8080)
├── public/           # Built frontend files (generated)
└── vercel.json       # Vercel deployment configuration
```

## 🚀 Deployment

### Frontend Deployment on Vercel

The frontend can be deployed to Vercel using the included `vercel.json` configuration:

1. **Connect your GitHub repository to Vercel**
2. **Vercel will automatically build and deploy** using the configuration in `vercel.json`
3. **Build process**: 
   - Installs dependencies in `frontend/`
   - Runs `npm run build` which creates optimized files in `public/`
   - Serves the built React app

### Backend Deployment Options

The backend can be deployed separately to:
- **Railway**: Connect your GitHub repo and deploy the `backend/` directory
- **Heroku**: Deploy using the `backend/package.json`
- **Vercel Functions**: Convert to serverless functions
- **DigitalOcean App Platform**: Deploy as a web service

### Database Setup

For production, set up MongoDB Atlas:
1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update the connection string in `backend/connector.js`

## 💻 Local Development

### Prerequisites
- Node.js 18.x or later
- MongoDB (local installation or MongoDB Atlas)

### Frontend Setup
```bash
cd frontend
npm install
npm start       # Starts on http://localhost:3000
```

### Backend Setup
```bash
cd backend
npm install
npm start       # Starts on http://localhost:8080
```

### API Endpoints

- `POST /api/booking` - Create a new booking
- `GET /api/booking` - Get the last booking

### Features

✅ **Movie Selection**: Choose from available movies  
✅ **Time Slot Selection**: Pick your preferred show time  
✅ **Seat Selection**: Select seats by type (A1, A2, A3, A4, B1, B2, B3, B4, C1, C2, C3, C4, D1, D2)  
✅ **Local Storage**: Persists user selections across page reloads  
✅ **Last Booking Display**: Shows previous booking details  
✅ **Responsive Design**: Bootstrap-based UI  
✅ **Form Validation**: Ensures all required fields are selected  

### Technical Stack

- **Frontend**: React 16, Webpack 4, Babel, Bootstrap
- **Backend**: Express.js, Mongoose, CORS
- **Database**: MongoDB
- **Deployment**: Vercel (Frontend), Railway/Heroku (Backend)

### Build Configuration

The project uses webpack with:
- OpenSSL legacy provider for Node.js compatibility
- CSS and style loaders for styling
- HTML webpack plugin for template generation
- Development proxy for API calls

---

## 🐛 Common Issues

### Node.js Version Compatibility
If you encounter OpenSSL errors, the project includes `--openssl-legacy-provider` flag in the npm scripts to handle Node.js 17+ compatibility issues.

### Port Conflicts
- Frontend runs on port 3000
- Backend runs on port 8080
- Make sure these ports are available

### MongoDB Connection
If MongoDB connection fails, the API will still work but won't persist data. Set up MongoDB Atlas for production use.

---

Built with ❤️ following BookMyShow design patterns 