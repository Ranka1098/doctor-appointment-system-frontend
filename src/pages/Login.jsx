import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"

import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: data.email,
        password: data.password,
      });
      if (response.status === 200) {
        const { token, user } = response.data;
        const userData = { name: user.name, email: user.email };
        
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(userData));
        alert("login successfull");
        navigate("/");
      }
      setData({
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };
  return (
    <div className="w-full h-screen p-5 flex justify-center items-center">
      <div className="container mx-auto max-w-[400px] border p-2">
        <h1 className="my-5 text-2xl font-bold text-center">Login</h1>
        {/* form */}
        <form className="my-5 p-2" onSubmit={handleSubmit}>
          {/* email */}
          <div className="flex flex-col my-1">
            <label htmlFor="">Email </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="border p-1 "
              placeholder="enter email"
            />
          </div>
          {/* pasword */}
          <div className="flex flex-col my-">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="border p-1 "
              placeholder="enter password"
            />
          </div>

          <button
            type="submit"
            className="text-center w-full mt-5 p-2 bg-blue-400"
          >
            Login
          </button>
        </form>
        {/* form */}
        <p className="text-center">
          Dont have account ?
          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer text-blue-500"
          >
            {" "}
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
