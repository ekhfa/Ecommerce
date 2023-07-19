import { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/register", { name, email, password, confirmPassword })
      .then((res) => {  

        // toast.success("Registration successful. Please check your email to verify your account.", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        alert("Registration successful. Please check your email to verify your account");
        navigate("/login");
       
      })
      .catch((err) => {
        // // toast.error(err.response.data.error, {
        // //   position: toast.POSITION.TOP_CENTER,
        // });

      });
  };

  return (
    <div className="d-flex justify-content-center align-items-start mt-4 mb-4">
      <div style={{
          backgroundColor: "#ccc", // Replace with your desired off-white color code
          padding: "1rem",
          borderRadius: "0.5rem",
          width: "350px",
          marginTop: "1.5rem", // Adjust the value to increase or decrease the distance from the header
        }}>
        <h2 className="text-center mb-4" style={{ fontSize: "2.5rem" }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label" style={{ fontSize: "1.5rem" }}>
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control form-control-lg"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ fontSize: "1.5rem" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control form-control-lg"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ fontSize: "1.5rem" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control form-control-lg"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label" style={{ fontSize: "1.5rem" }}>
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              className="form-control form-control-lg"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-success form-control-lg">
              <span className="fs-6">Sign Up</span>
            </button>
          </div>
        </form>
        <p className="text-center mt-3 mb-0">Already have an account?</p>
        <NavLink
          to="/login"
          className="btn btn-default border bg-light w-100 mt-2 text-decoration-none"
        >
          Sign In 
        </NavLink>
      </div>
    </div>
  );
}

export default Signup;
