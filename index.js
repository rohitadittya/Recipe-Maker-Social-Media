require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./server/routes/index.js');
const handleError = require('./server/middlewares/errorHandler.js');

const app = express();
mongoose.connect(process.env.dbURL)
    .then(console.log("DB Connected"))
    .catch(err => console.error("DB Connection Error:", err));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});

app.use(express.json());

// Serve static files for the frontend
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Handle routes
app.use('/api', routes);

// common error handler middleware
app.use(handleError);

const port = process.env.PORT || 5000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});