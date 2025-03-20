const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const errorMiddleware = require('./middleware/errorHandler');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173']
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Routes
app.use('/todos', todoRoutes);

// Error middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});