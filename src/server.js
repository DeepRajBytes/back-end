// server.js
const express = require('express');
const cors = require('cors');
const app = express();
// const app = require('.');
const mongoose = require('mongoose')

app.use(express.json());
app.use(
    cors({
      credentials: true,
      // origin: ["http://localhost:4200"],
  
      origin: ["https://e-commerce-frontend-roan-delta.vercel.app"]
    })
  );
const PORT = 5200;

const uri="mongodb+srv://deviflair2020:admin@cluster0.bwhbeak.mongodb.net/"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

app.listen(PORT, async() => {
    console.log('Server running successfully on port', PORT);
});
