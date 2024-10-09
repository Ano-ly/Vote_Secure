import React, { useState } from "react";
import Biometric from "../../public/assets/Biometric.png";
import backarrow from "../../public/assets/backarrow.png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    console.log("Submitting login form...");

    // Simple validation (you can add more complex validation if needed)
    if (!username || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    // Clear the error message
    setErrorMessage("");

    // Optionally, you can add logic here to validate login credentials, e.g., making an API call

    // If successful, set success message and navigate to the dashboard
    setSuccessMessage("Login successful!");

    // Navigate to dashboard and pass the username
    navigate("/dashboard", { state: { username } });
  };

  return (
    <div className="relative container-r">
      <Link to="/">
        <img
          src={backarrow}
          alt="Back"
          className="absolute w-8 left-5 top-6 cursor-pointer"
        />
      </Link>

      <div className="bg-main_bg_color container-r flex flex-col items-center justify-center text-center p-14 md:pt-16 ">
        {/* the main login div */}
        <div className="flex flex-col items-center md:w-2/4">
          <img src={Biometric} alt="Biometric" className="w-9 mb-5 md:w-11" />
          <h1 className="text-white text-xl font-bold mb-4 md:text-2xl">Login</h1>
          <p className="text-gray-500 text-base max-w-96 leading-tight mb-6 ">
            Secure access to the admin dashboard for election creation and management
          </p>
          {/* inputs */}
          <form className="flex flex-col border-none gap-4 w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="ID Code"
              className="input placeholder-gray-500 text-sm w-full text-center p-2 rounded-lg text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input placeholder-gray-500 text-sm w-full text-center p-2 rounded-lg text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="text-white mt-8 bg-primary_blue w-full p-2 rounded-lg text-base"
            >
              Login
            </button>
          </form>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <div className="w-full flex justify-between mt-3 text-sm">
            <Link
              className="border py-2 px-6 border-primary_blue text-gray-500 cursor-pointer transition duration-200 hover:border-white hover:text-white md:text-base md:px-8"
              to={'/adminsignup'}
            >
              Sign up
            </Link>
            <a href="" className="flex justify-end items-end">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
