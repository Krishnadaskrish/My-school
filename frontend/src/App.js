import './App.css';
import Navbar from './componets/Navbar/Navbar';
import Carousel from './componets/carousel/Carousel';
import toast, { Toaster } from "react-hot-toast"
import { Route, Routes } from 'react-router';
import Home from './pages/HomePage/Home';
import TeacherDashbord from './pages/TeacherDashbord/TeacherDashbord';
import Profile from './pages/Profile/UserProfile'


function App() {
  return (
  <>
  <Toaster/>

    <Routes>
    <Route path='/' element={ < Home />}/>
    <Route path='/teacher' element={ < TeacherDashbord />}/>
    <Route path='/profile' element={ < Profile />}/>
    
      

    </Routes>

    </>  


  );
}

export default App;
