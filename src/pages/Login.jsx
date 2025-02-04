import React from "react";

const Login = () => {
  return (
    <div className="w-full h-screen p-5 flex justify-center items-center">
      <div className="container mx-auto max-w-[400px] border p-2">
        <h1 className="my-5 text-2xl font-bold text-center">Login</h1>
        {/* form */}
        <form className="my-5 p-2">
          {/* email */}
          <div className="flex flex-col my-1">
            <label htmlFor="">Email </label>
            <input type="email" name="" className="border p-1 " />
          </div>
          {/* pasword */}
          <div className="flex flex-col my-">
            <label htmlFor="">Password</label>
            <input type="password" name="" className="border p-1 " />
          </div>

          <button
            type="submit"
            className="text-center w-full mt-5 p-2 bg-blue-400"
          >
            Login
          </button>
        </form>
        {/* form */}
      </div>
    </div>
  );
};

export default Login;
