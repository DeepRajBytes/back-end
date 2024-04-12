// server.js
const app = require('.');
const mongoose = require('mongoose')

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
