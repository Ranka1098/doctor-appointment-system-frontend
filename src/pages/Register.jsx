import React from "react";

const Register = () => {
  return (
    <div>
      <div className="w-full h-screen p-5 flex justify-center items-center">
        <div className="container mx-auto max-w-[400px] border p-2">
          <h1 className="my-5 text-2xl font-bold text-center">Register</h1>
          {/* form */}
          <form className="my-5 p-2">
            {/* email */}
            <div className="flex flex-col my-1">
              <label htmlFor="">Name </label>
              <input
                type="text"
                name=""
                className="border p-1 "
                placeholder="enter name"
              />
            </div>
            {/* email */}
            <div className="flex flex-col my-1">
              <label htmlFor="">Email </label>
              <input
                type="email"
                name=""
                className="border p-1 "
                placeholder="enter email"
              />
            </div>
            {/* pasword */}
            <div className="flex flex-col my-">
              <label htmlFor="">Password</label>
              <input
                type="password"
                name=""
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
        </div>
      </div>
    </div>
  );
};

export default Register;
