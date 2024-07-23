import React from 'react'
import Navbar from '../../componets/Navbar/Navbar'
import Carousel from '../../componets/carousel/Carousel'
import AppointmentBooking from '../../componets/Boking/Booking'

function Home() {
  return (
    <div className='home-container'>
      <Navbar/>
      <Carousel/>
      <AppointmentBooking/>
    </div>
  )
}

export default Home
