import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch profile information
  const getProfile = async () => {
    try {
      // Retrieve values from localStorage
      const userId = localStorage.getItem("userId");
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");

      if (!userId || !refreshToken || !accessToken) {
        setError({ message: "Missing authentication details in localStorage." });
        return;
      }

      // Request body for the profile endpoint
      const requestBody = {
        auth_params: {
          user_id: userId,
          refresh_token: refreshToken,
        },
      };

      // Send POST request to the /profile/ endpoint
      const response = await axios.post("http://13.51.107.80:8000/api/profile/", requestBody, {
        headers: {
          accesstoken: accessToken,
        },
      });

      // Handle successful response
      setProfileData(response.data);
      setError(null);
    } catch (err) {
      // Handle error response
      setError(err.response || err);
      setProfileData(null);
    }
  };

  // Example: Simulate storing values in localStorage (replace with login response)
  const saveTokensToLocalStorage = () => {
    const userId = "5812b06f-0bfd-4ffd-9361-9a82f04db0fe";
    const refreshToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczNTE4OTc0OSwianRpIjoiMTc4ZDEwZGMzZmQyNDFjMjg0MzE1NmZiNWM2N2FlZjQiLCJ1c2VyX2lkIjoiNTgxMmIwNmYtMGJmZC00ZmZkLTkzNjEtOWE4MmYwNGRiMGZlIn0.T_7lhsQ5NDQ_-hFcU4pQxQFlVRI_hRaZzvkZrInVDYg";
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MTAzNjQ5LCJqdGkiOiJiNmM5NTc5ZTcwYzE0MjMxOGE4ZjcxZWRiNDNkMTE3NiIsInVzZXJfaWQiOiI1ODEyYjA2Zi0wYmZkLTRmZmQtOTM2MS05YTgyZjA0ZGIwZmUifQ.UWPA8zBF75EaNpJhJQ3kDq-wopx5v5ctuikmF7Qcxm8";

    localStorage.setItem("userId", userId);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);

    alert("Authentication details saved to localStorage.");
  };

  return (
    <div>
      <h1>Profile Information</h1>
      <button onClick={saveTokensToLocalStorage}>Save Tokens to LocalStorage</button>
      <button onClick={getProfile}>Fetch Profile</button>

      {profileData && (
        <div>
          <p><strong>User ID:</strong> {profileData.user_id}</p>
          <p><strong>Full Name:</strong> {profileData.full_name}</p>
          <p><strong>Email:</strong> {profileData.email_id}</p>
          <p><strong>Phone Number:</strong> {profileData.phone_no}</p>
        </div>
      )}

      {error && (
        <div style={{ color: "red" }}>
          <p>Error fetching profile information.</p>
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;