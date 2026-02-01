const express = require('express');
const Availability = require('../models/Availability');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'professor') {
      return res.status(403).json({
        message: 'Only professors can create availability'
      });
    }

    const { date, startTime, endTime } = req.body;

    // Basic validation
    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        message: 'Date, startTime, and endTime are required'
      });
    }

    const availability = await Availability.create({
      professor: req.user.id,
      date,
      startTime,
      endTime
    });

    res.status(201).json({
      message: 'Availability created successfully',
      availability: {
        id: availability._id,
        date: availability.date,
        startTime: availability.startTime,
        endTime: availability.endTime,
        isBooked: availability.isBooked
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// View available slots (students & professors)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { date, professorId } = req.query;

    const filter = { isBooked: false };

    if (date) {
      filter.date = date;
    }

    if (professorId) {
      filter.professor = professorId;
    }

    const slots = await Availability.find(filter)
      .populate('professor', 'name email role')
      .sort({ date: 1, startTime: 1 });

    res.status(200).json({
      count: slots.length,
      slots
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
});

module.exports = router;
