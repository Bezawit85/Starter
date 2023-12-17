import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstN, setFirstN] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register", { email, password });
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
    bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style={{backgroundColor:"#dcdcf5"}}>
    <div className="max-w-md w-full space-y-8 bg-white">
      <div>
      <h1 className="mt-6 text-center text-2xl text-gray-900">Already logged in?</h1>
      </div>
      <div className="mx-auto w-8/12">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
          <div>
          <label htmlFor="firstN" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input type="firstN"
           value={firstN}
           placeholder="enter first name"
            onChange={(e) => setFirstN(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
             focus:outline-none focus:shadow-outline" 
             />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
          <input type="email"
           value={email}
           placeholder="enter email address"
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
             focus:outline-none focus:shadow-outline" 
             />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
          <input type="password" 
          value={password} 
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
          />
        </div>
        </div>
        <div>
          <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm
         font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 mb-6" type="submit">Register</button>
        </div>
        </form>
        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
    </div>
    </div>
    </div>
  );
};

export default Register;
