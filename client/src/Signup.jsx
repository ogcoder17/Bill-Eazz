import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const Navigate = useNavigate();

    const validateInputs = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const nameRegex = /^[a-zA-Z]{2,}$/;
    
        if (!firstname || !nameRegex.test(firstname)) {
          return "First name must contain at least 2 alphabetic characters.";
        }
        if (!lastname || !nameRegex.test(lastname)) {
          return "Last name must contain at least 2 alphabetic characters.";
        }
        if (!position) {
          return "Please select a position: Employer or Job Seeker.";
        }
        if (!email || !emailRegex.test(email)) {
          return "Enter a valid email address.";
        }
        if (!password || password.length < 8) {
          return "Password must be at least 8 characters long.";
        }
        return "";
      };

      const handleSubmit = (e) => {
        e.preventDefault();
    
    
        const validationError = validateInputs();
        if (validationError) {
          setErrorMessage(validationError);
          setSuccessMessage("");
          return;
        }
    
        
        axios
          .post("backend server name here", {
            fullName,
            email,
            phone,
            password,
            confirmPassword,
          })
          .then((response) => {console.log(response.data);
            setErrorMessage("");
            setSuccessMessage("Sign Up successful!");
            setFullName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setConfirmPassword("");
            Navigate('/Login');
            
          })
          .catch((err) => {
            console.error(err);
            if (err.response && err.response.status === 400) {
              setErrorMessage("Account email already exists.");
            } else {
              setErrorMessage("An error occurred. Please try again.");
            }
            setSuccessMessage("");
          });
      };

  return (
    
    <section className="bg-light py-3 py-md-5 py-xl-8">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="mb-5">
              <div className="text-center mb-4">
              </div>
              <div className="text-center mb-4">
                  <img 
                    src="./BillEazz.png" 
                    alt="Bill Eazz Logo" 
                    width="50" 
                    height="50" 
                  />
                  <h3 style={{fontFamily:"serif"}}>Bill-Eazz</h3>
              </div>
            </div>
             <div className="card border border-light-subtle rounded-4">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <form action="//onSubmit goes here//"> 
                  <h5 style={{fontFamily:"serif"}} className="text-center mb-4">SIGN UP</h5>
                  <div className="row gy-3 overflow-hidden">
                  <p>
                    <b style={{fontFamily:"initial"}}>
                     <sup>*</sup>All fields are mandatory
                    </b>
                  </p>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input 
                          type="text" 
                          className="form-control" 
                          name="fullName" 
                          id="fullName" 
                          placeholder="Full Name" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required 
                        />
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input 
                          type="email" 
                          className="form-control" 
                          name="email" 
                          id="email" 
                          placeholder="Email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required 
                        />
                        <label htmlFor="email" className="form-label">Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input 
                          type="text" 
                          className="form-control" 
                          name="phone" 
                          id="phone" 
                          placeholder="Phone" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required 
                        />
                        <label htmlFor="phone" className="form-label">Phone</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input 
                          type="password" 
                          className="form-control" 
                          name="password" 
                          id="password" 
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} 
                          required 
                        />
                        <label htmlFor="password" className="form-label">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input 
                          type="password" 
                          className="form-control" 
                          name="confirmpassword" 
                          id="confirmpassword" 
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)} 
                          required 
                        />
                        <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          value="" 
                          name="iAgree" 
                          id="iAgree" 
                          required 
                        />
                        <label className="form-check-label text-secondary" htmlFor="iAgree">
                          I agree to the <a href="#!" className="link-info text-decoration-none">terms and conditions</a>
                        </label>
                      </div>
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
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn btn-info btn-lg" type="submit" href="/Login">Sign up</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <br />
            <div className="text-center">
                <a href="#!" className="btn bsb-btn-2xl btn-info" >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    className="bi bi-google" 
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  <span className="ms-2 fs-6">Sign in with Google</span>
                </a>
              </div>
            <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-4">
              <p className="m-0 text-secondary text-center">
                Already have an account? <a href="/Login" className="link-info text-decoration-none">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;