import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SetDetails() {
  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
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
    if (companyName && phoneNumber && address) {
      // Save company details to session storage
      sessionStorage.setItem("companyName", companyName);
      sessionStorage.setItem("logo", logo);
      sessionStorage.setItem("phoneNumber", phoneNumber);
      sessionStorage.setItem("address", address);
      navigate("/"); // Redirect to the main page
    } else {
      alert("Please fill in all fields.");
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
        style={{ marginBottom: "10px", padding: "10px", width: "300px" }}
      />
      <br />
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px", width: "300px" }}
      />
      <br />
      <textarea
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "300px", height: "100px" }}
      />
      <br />
      <button onClick={handleProceed} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Proceed
      </button>
    </div>
  );
}

export default SetDetails;
