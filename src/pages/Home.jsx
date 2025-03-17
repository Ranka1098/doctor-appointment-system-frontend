import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, setUser } from "../redux/slices/user";
import { useEffect } from "react";
import Layout from "../components/Layout";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  // jo redux store me usert tha usse liya

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
