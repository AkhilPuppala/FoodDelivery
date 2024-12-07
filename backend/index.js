const express = require('express');
const cors = require('cors');
const mongoDB = require('./db');

// Initialize Express App
const app = express();
const port = 5000;

// Connect to MongoDB
mongoDB();

// Middleware: Parse JSON Requests
app.use(express.json());

// Middleware: CORS Configuration
const allowedOrigins = ["http://localhost:3000", "http://192.168.49.2:30003"];
app.use(
    cors({
        origin: allowedOrigins,
        methods: "GET, POST, PUT, DELETE, OPTIONS",
        allowedHeaders: "Content-Type, Authorization",
    })
);

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
