import Layout from "../../components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Doctor = () => {
  const [doctor, setDoctor] = useState([]);
  useEffect(() => {
    const getAllDoctor = async () => {
      try {
        const res = await axios.get("http://localhost:3000/get-All-doctor", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("res", res.data.data);
        setDoctor(res.data.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    getAllDoctor();
  }, []);
  return (
    <Layout>
      <h1>All doctors</h1>
      <table className="w-full ">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm ">
            <td className="p-3 border text-center    border-gray-300">Name</td>
            <td className="p-3  border text-center  border-gray-300">email</td>
            <td className="p-3  border text-center border-gray-300">phone</td>
            <td className="p-3  border text-center border-gray-300">satus</td>
            <td className="p-3  border text-center border-gray-300">Actions</td>
          </tr>
        </thead>
        <tbody>
          {doctor.map((doctor) => (
            <tr className="bg-white hover:bg-gray-100 text-gray-700 text-center">
              <td className="p-3 border border-gray-300">
                {doctor.firstName + " " + doctor.lastName}
              </td>
              <td className="p-3 border border-gray-300">{doctor.email}</td>
              <td className="p-3 border border-gray-300">{doctor.phone}</td>
              <td className="p-3 border border-gray-300">
                {doctor.status ? "pending" : "NO"}
              </td>
              <td className="border border-gray-300">
                {doctor.status === "pending" ? (
                  <button className="px-3   py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
                    Approved
                  </button>
                ) : (
                  <button className="px-3   py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                    block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Doctor;
