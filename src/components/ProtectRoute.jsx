import axios from "axios";

const ProtectRoute = ({ children }) => {
  // token ko check karenge
  const token = localStorage.getItem("token");
  //   agar token milta hai to sabhi element children ko return kardenge

  const getUserDetail = async () => {
    const token = localStorage.getItem("token");
    console.log("Stored Token:", token); // ✅ Token को check करें

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    try {
      const resp = await axios.get("http://localhost:3000/getuser", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ सही format में भेजें
        },
      });
      console.log("API Response:", resp.data);
    } catch (error) {
      console.error(
        "Error fetching user:",
        error.response?.data || error.message
      );
    }
  };
  getUserDetail();

  if (token) {
    return children;
  } else {
    // agar token nahi milta hai to login page per redirect kar denge

    return <Navigate to={"/login"}></Navigate>;
  }
};

export default ProtectRoute;
