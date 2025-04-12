const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables
const weatherRoutes = require('./routes/weather');

const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));