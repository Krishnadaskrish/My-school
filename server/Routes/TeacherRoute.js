const express = require('express')
const TeacherRoute = express.Router()
const verifyToken = require('../middleware/Auth')
const TeacherController = require('../controllers/TeacherController')


TeacherRoute
.get("/:teacherId/appointments",verifyToken,TeacherController.getTeacherAppointments)
.post('/approve-appointment',verifyToken,TeacherController.approveAppointment );

module.exports = TeacherRoute