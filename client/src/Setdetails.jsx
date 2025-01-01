import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SetDetails() {
  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState(null);
  const navigate = useNavigate();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result); // Save the uploaded logo
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProceed = () => {
    if (companyName) {
      // Save company details to session storage
      sessionStorage.setItem("companyName", companyName);
      sessionStorage.setItem("logo", logo);
      navigate("/"); // Redirect to the main page
    } else {
      alert("Please enter a company name.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Set Company Details</h1>
      <div style={{ marginBottom: "20px" }}>
        {logo && <img src={logo} alt="Logo Preview" style={{ maxWidth: "100px", marginBottom: "10px" }} />}
        <input type="file" onChange={handleLogoUpload} accept="image/*" />
      </div>
      <input
        type="text"
        placeholder="Enter Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />
      <br />
      <button onClick={handleProceed} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Proceed
      </button>
    </div>
  );
}

export default SetDetails;
