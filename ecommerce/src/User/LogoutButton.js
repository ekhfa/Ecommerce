import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post("http://localhost:8080/logout")
      .then((res) => {
        console.log("Logged out");
        // Redirect user to login page or perform any other actions
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
