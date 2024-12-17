import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Signup from './Signup';
import Login from './Login';


function Routing() {


    return (
      <BrowserRouter>
        <Routes>
      
      <Route path="/" element={<App />} ></Route>
      <Route path="/Signup" element={<Signup />} ></Route>
      <Route path="/Login" element={<Login />} ></Route>

        </Routes>
      </BrowserRouter>
    )
  }
  
  export default Routing
  