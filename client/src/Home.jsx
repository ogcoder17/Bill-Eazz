import React from 'react'
import './Home.css'
import Navbar from './Navbar'

const Home = () => {
  return (
    <div>
      <Navbar />
       <div id="app-root">
      <div className="content">
      <header>
        
        <h1>BILL EAZZ</h1>
        <div className="container">
          <h4>Here to provide the easiest way for users to store bills without any paper-hassle!</h4>
          <a className="btn btn-info" href="#" role="button">Generate Bill</a>
        </div>
        </header>
      </div>
       </div>
    </div>
  )
}

export default Home
