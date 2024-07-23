const Booking = require('../models/BookingSchema')



const getTeacherAppointments = async (req, res) => {
    try {
      const { teacherId } = req.params;
      const appointments = await Booking.find({ teacher: teacherId }).populate('student');
  
      res.status(200).json({ status: 'success', data: appointments });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Server error' });
    }
  };

  const approveAppointment = async (req, res) => {
    try {
      const { appointmentId } = req.body;
      
      const appointment = await Booking.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({ status: 'error', message: 'Appointment not found' });
      }
  
      appointment.approved = true;
      await appointment.save();
  
      res.status(200).json({ status: 'success', message: 'Appointment approved', data: appointment });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Server error' });
    }
  };


  module.exports = {
    getTeacherAppointments,
    approveAppointment
   
  };