const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const Booking = require('../models/BookingSchema')

const GetTeacherList = async (req, res) => {
  try {
    const Teachers = await User.find({ role: "Teacher" });
    res
      .status(200)
      .json({ status: "success", message: "successfully fetched techers " , data: Teachers });
  } catch (error) {
    res
      .status(500)
      .json({ status: "success", message: "server error " });
  }
};

const bookAppointment = async (req, res) => {
  console.log('lllllllll')
  try {
    const { teacher, student, date, time } = req.body;
    const newAppointment = new Booking({
      teacher,
      student,
      date,
      time,
    });

    await newAppointment.save();

    res.status(201).json({ status: 'success', message: 'Appointment booked', data: newAppointment });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone, institute } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.institute = institute || user.institute;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  GetTeacherList,
  bookAppointment,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
};
