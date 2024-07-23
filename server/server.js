require('dotenv').config();
const express = require('express')
const cors = require('cors')
const DBConnection = require('./config/dbConnection')




const app = express();
const port = 3002 ;

const AuthRoute = require("./Routes/AuthRoute");
const StudentRoute = require('./Routes/StudentRoute')
const TeacherRoute = require('./Routes/TeacherRoute')


app.use(express.json())
app.use(cors())
app.use('/api',AuthRoute)
app.use('/api/student',StudentRoute)
app.use('/api/teacher',TeacherRoute)
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});