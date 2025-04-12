import React from 'react'
import Header from '../components/Header'
import Service from '../components/Service'
import Popular from '../components/Popular'

const Home = () => {
  console.log("Home component loaded")
  return (
    <div>
      <Header/>
      <Service/>
      <Popular/>
    </div>
  )
}

export default Home
