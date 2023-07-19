import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/Login", { email, password})
      .then( res => {
        console.log("Login: " , res.data.Status);
        console.log()
        if(res.data.Status === "Success"){
            console.log(res.data.Status);
            navigate("/product/1");
        }          
      })
      .catch((err) => console.log(err));
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
        <h2 className="text-center mb-4" style={{ fontSize: "2.5rem" }}>Sign In</h2>
        <form onSubmit={handleSubmit}>
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
          
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-success form-control-lg">
              <span className="fs-6">Sign In</span>
            </button>
          </div>
        </form>
        <p className="text-center mt-3 mb-0">Don't have an account?</p>
        <Link
          to="/register"
          className="btn btn-default border bg-light w-100 mt-2 text-decoration-none"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Signup;
