import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import sidebarMenu from "../data/data";
const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));

        if (!token) {
          console.log("No token found in localStorage");
          return;
        }

        const res = await axios.get("http://localhost:3000/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user); // Store user data in state
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    console.log("logout");
    const res = await axios.get("http://localhost:3000/logout");
    if (res.status === 200) {
      alert("logout successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="flex gap-1  min-h-screen">
      <div className="sidebar w-[15%] h-screen flex gap-1 flex-col  ">
        {/* logo */}
        <div className="logo  border border-black  h-[80px] p-5 bg-amber-950 text-white text-2xl font-bold flex justify-center items-center">
          logo
        </div>
        {/* menu */}
        <div className="menu  flex justify-between flex-col  h-screen border border-black bg-amber-950">
          <div>
            {sidebarMenu.map((menu, index) => (
              <Link to={menu.path} key={index}>
                <div className="flex  gap-5 py-3 pl-3 justify-start items-center hover:bg-white ">
                  <span className="text-2xl">{menu.icon}</span>

                  <p className="text-md">{menu.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div
            className="flex gap-3 justify-start items-center bg-red-500 p-1 cursor-pointer"
            onClick={handleLogout}
          >
            <span className="text-xl font-bold ">
              <LuLogOut />
            </span>
            <p className="text-md text-white">Logout</p>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="content w-full h-screen  flex gap-1 flex-col">
        <div className="header h-[80px] p-5 border border-black">header</div>
        <div className="body h-screen border border-black">body</div>
      </div>
    </div>
  );
};

export default Home;
