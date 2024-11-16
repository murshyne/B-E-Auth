import express from 'express';
import connectDB from './config/db.mjs';
import dotenv from 'dotenv';
import userRoutes from './routes/api/users.mjs';
import authRoutes from './routes/api/auth.mjs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the current directory (__dirname equivalent in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

//Initialize our app variable with Express
const app = express();

//Connect Database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));
app.use(cors());


// Serve static files from the Vite build (dist folder)
const frontendPath = path.join(__dirname, '../FrontEnd/dist');

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(frontendPath));

  // Catch-all route to serve the frontend index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendPath, 'index.html'));
  });
}


//Single endpoint just to test API. Send data to browser
app.get('/', (req, res) => res.send('API Running'))

//Define Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Environmental Variables
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
