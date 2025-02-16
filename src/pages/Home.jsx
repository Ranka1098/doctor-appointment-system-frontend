import { FaUser } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import sidebarMenu from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../redux/slices/user";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  // jo redux store me usert tha usse liya

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
        <div className="header h-[80px] p-5 border border-black flex justify-end items-center gap-5">
          <FaUser />
          <Link to={"/profile"}>
            <p> {user?.name}</p>
          </Link>
        </div>
        <div className="body h-screen border border-black">body</div>
      </div>
    </div>
  );
};

export default Home;
