import React from "react";
import axios from "axios";
import { FaHome, FaListUl, FaUserMd, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { adminMenu } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, setUser } from "../redux/slices/user";
import { useEffect } from "react";
import { IoMdNotifications } from "react-icons/io";
import { userMenu } from "../data/data";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  // ---------------------doctor menu--------------------------------
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Appointment",
      path: "/appointment",
      icon: <FaListUl />,
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: <FaUser />,
    },
  ];
  // ---------------------doctor menu--------------------------------

  // // rendering menu list
  const sidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  // agar useradmin hai to admin menu show karo user hai to user menu show karo agar user doctor hai to doctor menu show karo.
  const handleLogout = async () => {
    const res = await axios.get("http://localhost:3000/logout");
    if (res.status === 200) {
      alert("logout successfully");
      localStorage.removeItem("token");
      dispatch(logOutUser());
      navigate("/login");
      localStorage.clear();
    }
  };

  useEffect(() => {
    const getuserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("token no found");
        return;
      }
      try {
        const res = await axios.get("http://localhost:3000/getuser", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setUser(res.data.data));
      } catch (error) {
        console.log(error.message);
      }
    };

    getuserData();
  }, []);

  return (
    <>
      <div className="main-container w-full h-screen p-1 flex gap-1">
        <div className="left-side border w-[15rem] flex flex-col justify-between ">
          <div className="left-sidebae-menu">
            {/* logo */}
            <div className="logo w-full h-[5rem] flex justify-center items-center bg-amber-400 ">
              <p>Doctor App</p>
            </div>
            {/* logo */}
            {/* menu */}
            <div className="menu-list">
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
            </div>
          </div>
          {/* menu */}
          {/* logout button */}

          <div>
            <div
              className="flex h-[3rem] gap-3 justify-start items-center bg-red-500 p-1 cursor-pointer"
              onClick={handleLogout}
            >
              <span className="text-xl font-bold ">
                <LuLogOut />
              </span>
              <p className="text-md text-white">Logout</p>
            </div>
          </div>
          {/* logout button */}
        </div>
        {/* --------------------------------------------------------- */}
        <div className="right-side flex-1 border-b">
          <div className="header  w-full h-[5rem] border flex items-center justify-end pr-[1rem] ">
            <div className="relative mr-[15px]">
              <Link to={"/notification"}>
                <IoMdNotifications size={25} />

                {user && user?.notification?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {user && user.notification ? user.notification.length : 0}
                  </span>
                )}
              </Link>
            </div>
            <Link to={"/profile"}>
              <p> {user?.name}</p>
            </Link>
          </div>
          <div className="home">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
