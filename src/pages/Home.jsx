import { FaUser } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { adminMenu, userMenu } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, setUser } from "../redux/slices/user";
import { useEffect } from "react";
import Layout from "../components/Layout";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  // rendering menu list
  const sidebarMenu = user?.isAdmin ? adminMenu : userMenu;

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

        dispatch(setUser({ ...user, doctors: res.data }));
      } catch (error) {
        console.log(error.message);
      }
    };

    getuserData();
  }, []);

  return (
    <Layout>
      <p className="text-3xl">Home</p>
    </Layout>
  );
};

export default Home;
