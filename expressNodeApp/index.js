require('dotenv').config();

const mongoURI = process.env.MONGO_URI || "mongodb+srv://admin:WpcR7kit3VASd59O@expressnodedb.fswlks5.mongodb.net/kanbanDB?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => { console.error(err); process.exit(1); });

// Middleware

app.use(cors({
  origin: [
    'http://localhost:5173',                        // local dev
    'https://wonderful-rock-0e067aa00.7.azurestaticapps.net'      // static hosting URL
  ]
}));
app.use(express.json());

// Jobs route
const jobsRoute = require('./API/jobs');
app.use('/api', jobsRoute);

// then at the bottom
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));