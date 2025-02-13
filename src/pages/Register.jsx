import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/slices/alertSlice";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      dispatch(showLoading());
      const response = await axios.post("http://localhost:3000/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(response);
      dispatch(hideLoading());
      if (response.status === 201) {
        alert("send data successfully");
        setData({
          name: "",
          email: "",
          password: "",
        });
      }
      navigate("/login");
    } catch (error) {
      dispatch(hideLoading());
      if (error.response) {
        setError(error.response.data.message);
      } else {
        alert("something wen wrong plss try again later");
      }
    }
  };
  return (
    <div>
      <div className="w-full h-screen p-5 flex justify-center items-center">
        <div className="container mx-auto max-w-[400px] border p-2">
          <h1 className="my-5 text-2xl font-bold text-center">Register</h1>
          {error && <p className="text-red-500 text-xl">{error}</p>}
          {/* form */}
          <form className="my-5 p-2" onSubmit={handleSubmit}>
            {/* email */}
            <div className="flex flex-col my-1">
              <label htmlFor="">Name </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="border p-1 "
                placeholder="enter name"
              />
            </div>
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
              create new account
            </button>
          </form>
          {/* form */}
          <p className="text-center">
            All ready have account ?{" "}
            <span
              onClick={() => {
                navigate("/login");
              }}
              className=" text-blue-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
