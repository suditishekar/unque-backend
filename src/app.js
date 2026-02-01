const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// Mount user routes
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

module.exports = app;

