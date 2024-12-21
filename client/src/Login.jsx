import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login with:', loginInput, password);
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
                      id="loginInput"
                      placeholder="Email or Phone Number"
                      value={loginInput}
                      onChange={(e) => setLoginInput(e.target.value)}
                      required
                    />
                    <label htmlFor="loginInput" className="form-label">
                      Email or Phone Number
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
                <a href="/" className="link-info text-decoration-none">
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
