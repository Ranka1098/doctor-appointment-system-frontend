import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);

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

        console.log("User Data:", res.data);
        setUser(res.data.user); // Store user data in state
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Home;
