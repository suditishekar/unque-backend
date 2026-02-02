const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Appointment = require('../models/Appointment');
const Availability = require('../models/Availability');

const router = express.Router();

// Student books an appointment
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Role check
    if (req.user.role !== 'student') {
      return res.status(403).json({
        message: 'Only students can book appointments'
      });
    }

    const { availabilityId } = req.body;

    if (!availabilityId) {
      return res.status(400).json({
        message: 'availabilityId is required'
      });
    }

    // Find availability slot
    const availability = await Availability.findById(availabilityId);

    if (!availability) {
      return res.status(404).json({
        message: 'Availability slot not found'
      });
    }

    // Check if already booked
    if (availability.isBooked) {
      return res.status(400).json({
        message: 'This slot is already booked'
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      student: req.user.id,
      professor: availability.professor,
      date: availability.date,
      startTime: availability.startTime,
      endTime: availability.endTime
    });

    // Mark availability as booked
    availability.isBooked = true;
    await availability.save();

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: {
        id: appointment._id,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        status: appointment.status
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
});

module.exports = router;
