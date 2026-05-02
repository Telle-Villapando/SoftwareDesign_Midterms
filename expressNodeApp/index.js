const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const mongoURI = "mongodb+srv://admin:WpcR7kit3VASd59O@expressnodedb.fswlks5.mongodb.net/";
//"mongodb://admin:<db_password>@ac-x3wmgt3-shard-00-00.fswlks5.mongodb.net:27017,ac-x3wmgt3-shard-00-01.fswlks5.mongodb.net:27017,ac-x3wmgt3-shard-00-02.fswlks5.mongodb.net:27017/?ssl=true&replicaSet=atlas-wyokyu-shard-0&authSource=admin&appName=expressNodeDB";

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => { console.error(err); process.exit(1); });

  //middleware
app.use(cors());
app.use(express.json());

// Jobs route
const jobsRoute = require('./API/jobs');
app.use('/api', jobsRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));