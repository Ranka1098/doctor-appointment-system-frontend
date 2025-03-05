import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getAllUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/get-All-user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("res", res.data.data);
        setUser(res.data.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    getAllUser();
  }, []);
  return (
    <Layout>
      <h1>All user list</h1>
      <table className="w-full ">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
            <td className="p-3 border border-gray-300">Name</td>
            <td className="p-3 border border-gray-300">Email</td>
            <td className="p-3 border border-gray-300">doctor</td>
            <td className="p-3 border border-gray-300">Actions</td>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr className="bg-white hover:bg-gray-100 text-gray-700 text-center">
              <td className="p-3 border border-gray-300">{user.name}</td>
              <td className="p-3 border border-gray-300">{user.email}</td>
              <td className="p-3 border border-gray-300">
                {user.isDoctor ? "YES" : "NO"}
              </td>
              <td className="border border-gray-300">
                <button className="px-3   py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                  block
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default User;
