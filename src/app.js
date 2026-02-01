const express = require('express');
const userRoutes = require('./routes/userRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/availability', availabilityRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

module.exports = app;

