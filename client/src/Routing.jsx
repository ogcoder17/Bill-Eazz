import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Signup from './Signup';
import Login from './Login';
<<<<<<< HEAD
import SetDetails from "./Setdetails";
=======
import Home from './Home';
import Profile from './Profile';
import Footer from './Footer';
import Navbar from './Navbar';
>>>>>>> 847f9dc69a4020ad25156631cad4825932c3ab5f


function Routing() {


    return (
      <BrowserRouter>
        <Routes>
      
      <Route path="/" element={<App />} ></Route>
      <Route path="/Signup" element={<Signup />} ></Route>
      <Route path="/Login" element={<Login />} ></Route>
<<<<<<< HEAD
      <Route path ="/Setdetails" element={<SetDetails/>}></Route>
=======
      <Route path="/Home" element={<Home />}></Route>
      <Route path="/Profile" element={<Profile />}></Route>
      <Route path="/Navbar" element={<Navbar />}></Route>
>>>>>>> 847f9dc69a4020ad25156631cad4825932c3ab5f

        </Routes>
        <Footer />
      </BrowserRouter>
    )
  }
  
  export default Routing
  