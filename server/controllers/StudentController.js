const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const Booking = require("../models/BookingSchema");
const emailTransporter = require("../config/Notification");

const GetTeacherList = async (req, res) => {
  try {
    const Teachers = await User.find({ role: "Teacher" });
    res
      .status(200)
      .json({
        status: "success",
        message: "successfully fetched techers ",
        data: Teachers,
      });
  } catch (error) {
    res.status(500).json({ status: "success", message: "server error " });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { teacher, student, date, time } = req.body;
    const newAppointment = new Booking({
      teacher,
      student,
      date,
      time,
    });

    const user = await User.findById(teacher);
    const newstudent = await User.findById(student);
    const name = newstudent.name;
    console.log(user.email, "sdsd");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Verify your email",
      text: `${name} is booked for a class please check you availability`,
    };

    await newAppointment.save();
    await emailTransporter.sendMail(mailOptions);

    res
      .status(201)
      .json({
        status: "success",
        message: "Appointment booked",
        data: newAppointment,
      });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone, institute } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.institute = institute || user.institute;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  GetTeacherList,
  bookAppointment,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
