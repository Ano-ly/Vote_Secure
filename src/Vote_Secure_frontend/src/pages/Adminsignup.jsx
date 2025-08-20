import React, { useState } from "react";
import Biometric from "../../public/assets/Biometric.png";
import backarrow from "../../public/assets/backarrow.png";
import { Link, useNavigate } from "react-router-dom";
import { backendActorPromise } from "../utils/backend";

const Adminsignup = () => {
  const navigate = useNavigate();

  // State to store form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Error message
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async () => {
    setErrorMsg("");

    if (!name || !email || !phone || !username || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    try {
      const backend = await backendActorPromise;
      const result = await backend.signup(name, email, phone, username, password);
      const [status, message] = result;

      if (status === "Success") {
        // Save username globally in localStorage
        localStorage.setItem("username", username);

        navigate("/dashboard", { state: { username } });
      } else {
        setErrorMsg(message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMsg("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="relative container-r">
      <Link to="/">
        <img src={backarrow} alt="Back" className="absolute w-8 left-5 top-6 cursor-pointer" />
      </Link>
      <div className="bg-main_bg_color flex flex-col items-center justify-center text-center p-14 md:pt-16 container-r">
        <div className="flex flex-col items-center w-full sm:w-3/4 md:w-2/4">
          <img src={Biometric} alt="Biometric Icon" className="w-9 mb-5 md:w-11" />
          <h1 className="text-white text-xl font-bold mb-4 md:text-2xl">Sign up</h1>
          <p className="text-white text-base max-w-96 leading-tight mb-6">Sign up as an admin</p>

          {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}

          <div className="flex flex-col border-none gap-4 w-full">
            <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)}
              className="input placeholder-gray-500 text-sm text-white w-full p-2 rounded-lg" />
            <input type="text" placeholder="E-mail address" value={email} onChange={(e) => setEmail(e.target.value)}
              className="input placeholder-gray-500 text-sm w-full p-2 rounded-lg text-white" />
            <input type="number" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="input placeholder-gray-500 text-sm w-full p-2 rounded-lg text-white" />
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
              className="input placeholder-gray-500 text-sm w-full p-2 rounded-lg text-white" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="input placeholder-gray-500 text-sm w-full p-2 rounded-lg text-white" />
          </div>

          <button onClick={handleSignUp} className="text-white mt-8 bg-primary_blue w-full p-2 rounded-lg text-base">
            Sign up
          </button>

          <Link to={"/login"}>
            <p className="text-blue-800 lg:text-base text-sm text-right py-3">
              Have an account already? Log in
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Adminsignup;
