import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/slices/alertSlice";
import axios from "axios";
import { setUser } from "../redux/slices/user";

const ProtectRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return;
    try {
      dispatch(showLoading());
      const res = await axios.get("http://localhost:3000/getuser", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(hideLoading());
      if (res.data.user) {
        dispatch(setUser(res.data.user));
      } else {
        return <Navigate to={"/login"} />;
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("user fetching error", error);
      localStorage.removeItem("user");
    }
  };
  useEffect(() => {
    //अगर user पहले से Redux store में है, तो API न कॉल करें:
    if (!user) {
      getUser();
    }
  }, [user]);

  // // token ko check karenge
  // const token = localStorage.getItem("token");
  // //   agar token milta hai to sabhi element children ko return kardenge
  // if (token) {
  //   return children;
  // } else {
  //   // agar token nahi milta hai to login page per redirect kar denge
  return user ? children : <Navigate to={"/login"}></Navigate>;
};

export default ProtectRoute;
