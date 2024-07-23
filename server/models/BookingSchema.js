const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  approved: { type: Boolean, default: false },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;