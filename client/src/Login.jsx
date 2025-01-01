import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      return "Enter a valid email address.";
    }
    if (!password || password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    return "";
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      setSuccessMessage("");
      return;
    }

    const requestBody = {
      auth_params: {
        user_id : "",
        refresh_token: "",
      },

      payload: {
        email: email,
        password: password,
      },
    };

    try {
      // Make the POST request to the backend
      const response = await axios.post("http://13.51.107.80:8000/api/login/", requestBody);

      // Handle success
      console.log(response.data);
      setErrorMessage("");
      setSuccessMessage("Login successful! Redirecting to Home Page...");
      setEmail("");
      setPassword("");
      navigate('/Home')
    } catch (err) {
      // Handle errors
      console.error("Error Response:", err.response || err); // Log error details
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.error || "Invalid email or password.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <section className="bg-light py-3 py-md-5 py-xl-8">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="text-center mb-4">
                <img
                  src="./BillEazz.png" 
                  alt="Bill Eazz Logo" 
                  width="50" 
                  height="50" 
                />
                <h3 style={{fontFamily:"serif"}}>Bill-Eazz</h3>
            </div>
            <div className="card border border-light-subtle rounded-4">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <form onSubmit={handleSubmit}>
                <h5 style={{fontFamily:"serif"}} className="text-center mb-4">LOGIN</h5>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="loginInput" className="form-label">
                      Email ID
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="password" className="form-label">Password</label>
                  </div>
                  {errorMessage && (
                      <small className="error-message" style={{ color: "red" }}>
                        {errorMessage}
                      </small>
                    )}
                    {successMessage && (
                      <small className="success-message" style={{ color: "green" }}>
                        {successMessage}
                      </small>
                    )}
                  <div className="d-grid">
                    <button className="btn btn-info btn-lg" type="submit">
                      Log In
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <a href="#!" className="text-secondary text-decoration-none">
                      Forgot your password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="m-0 text-secondary">
                Don't have an account?{' '}
                <a href="/Signup" className="link-info text-decoration-none">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
