const mongoose = require('mongoose');

//Define the MangoDb connection url

const mongoURL = 'mongodb://0.0.0.0:27017/hotels' // Replace 'mydatabase' with your database name

// Set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


//Get the default connection
// Mongoose maintains a default connection object representing the MangoDB connection.
const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to MangoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error : ', err);
});

db.on('disconnected', ()=>{
    console.log('MongoDB diConnected');
});

//Export the database connection 

module.exports = db;

