import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Footer from './Footer';
import Navbar from './Navbar';


function Routing() {


    return (
      <BrowserRouter>
        <Routes>
      
      <Route path="/" element={<App />} ></Route>
      <Route path="/Signup" element={<Signup />} ></Route>
      <Route path="/Login" element={<Login />} ></Route>
      <Route path="/Home" element={<Home />}></Route>
      <Route path="/Profile" element={<Profile />}></Route>
      <Route path="/Navbar" element={<Navbar />}></Route>

        </Routes>
        <Footer />
      </BrowserRouter>
    )
  }
  
  export default Routing
  