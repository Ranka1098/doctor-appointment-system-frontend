import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  // token ko check karenge
  const token = localStorage.getItem("token");
  //   agar token milta hai to sabhi element children ko return kardenge
  if (token) {
    return children;
  } else {
    // agar token nahi milta hai to login page per redirect kar denge
    return <Navigate to={"/login"}></Navigate>;
  }
};

export default ProtectRoute;
