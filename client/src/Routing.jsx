import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Signup from './Signup';
import Login from './Login';
import SetDetails from "./Setdetails";


function Routing() {


    return (
      <BrowserRouter>
        <Routes>
      
      <Route path="/" element={<App />} ></Route>
      <Route path="/Signup" element={<Signup />} ></Route>
      <Route path="/Login" element={<Login />} ></Route>
      <Route path ="/Setdetails" element={<SetDetails/>}></Route>

        </Routes>
      </BrowserRouter>
    )
  }
  
  export default Routing
  