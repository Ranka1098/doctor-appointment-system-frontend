import Layout from "../../components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user";

const Doctor = () => {
  const [doctor, setDoctor] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const getAllDoctor = async () => {
      try {
        const res = await axios.get("http://localhost:3000/get-All-doctor", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDoctor(res.data.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    getAllDoctor();
  }, []);

  const handleApproveDoctor = async (doctorId) => {
    const res = await axios.post(
      "http://localhost:3000/change-account-status",
      { doctorId, status: "approved" },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.status === 200) {
      dispatch(setUser(res.data.user));
      alert("doctor is approved ");
      // setDoctor((prev) =>
      //   prev.map((doctor) =>
      //     doctor._id === doctorId ? { ...doctor, status } : doctor
      //   )
      // );
      // dispatch(setUser(res.data.user));
    }
  };

  // const handleApproveDoctor = async (doctorId) => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:3000/changeAccountStatus",
  //       {
  //         doctorId,
  //         status: "approved",
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     if (res.status === 200) {
  //       dispatch(setUser(res.data.user)); // Updated user Redux me set karo
  //       alert("Doctor Approved");
  //     }
  //   } catch (error) {
  //     console.log("Error approving doctor:", error.message);
  //   }
  // };

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
            <tr
              className="bg-white hover:bg-gray-100 text-gray-700 text-center"
              key={doctor._id}
            >
              <td className="p-3 border border-gray-300">
                {doctor.firstName + " " + doctor.lastName}
              </td>
              <td className="p-3 border border-gray-300">{doctor.email}</td>
              <td className="p-3 border border-gray-300">{doctor.phone}</td>
              <td className="p-3 border border-gray-300">
                {doctor.status === "pending" ? "pending" : "approved"}
              </td>
              <td className="border border-gray-300">
                {doctor.status === "pending" ? (
                  <button
                    className="px-3   py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={() => handleApproveDoctor(doctor._id)}
                  >
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
