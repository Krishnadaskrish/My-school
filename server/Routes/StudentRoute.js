const express = require('express')
const StudentRoute = express.Router()
const studentController = require('../controllers/StudentController')
const verifyToken = require('../middleware/Auth')

StudentRoute
.get('/getTeachers',studentController.GetTeacherList)
.post('/book-appointment',verifyToken,studentController.bookAppointment)
.get('/profile/:id',verifyToken, studentController.getUserProfile)
.put('/profile/:id', verifyToken, studentController.updateUserProfile)
.delete('/profile/:id', verifyToken, studentController.deleteUserProfile)



module.exports = StudentRoute