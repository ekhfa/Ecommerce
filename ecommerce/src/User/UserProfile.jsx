import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
    axios.get("http://localhost:8080/check-auth", {
      withCredentials: true, 
    })
      .then(res => {
        console.log("check-auth response:", res.data);
        if (res.data.isAuthenticated) {
          fetchUserProfile(); // Fetch user profile only if logged in
        }
        // No need for an else case here
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:8080/user-profile");
      const data = await response.json();
      console.log(data)
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
}

export default UserProfile;
