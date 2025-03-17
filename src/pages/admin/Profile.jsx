import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const [doctor, setDoctor] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [information, setInformation] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    specialization: "",
    experince: "",
    feesPerConsultation: "",
    timing: "",
  });

  // Handle Start & End Time
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (startTime && endTime) {
      setInformation((prev) => ({
        ...prev,
        timing: `${startTime} - ${endTime}`,
      }));
    }
  }, [startTime, endTime]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInformation((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const getDoctorDetail = async () => {
      const res = await axios.get(
        `http://localhost:3000/getDoctorDetail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDoctor(res.data.data);
    };
    getDoctorDetail();
  }, [id]);

  useEffect(() => {
    if (doctor) {
      setInformation({
        firstName: doctor.firstName || "",
        lastName: doctor.lastName || "",
        phone: doctor.phone || "",
        email: doctor.email || "",
        website: doctor.website || "",
        address: doctor.address || "",
        specialization: doctor.specialization || "",
        experince: doctor.experince || "",
        feesPerConsultation: doctor.feesPerConsultation || "",
        timing: doctor.timing || "",
      });
    }

    if (doctor.timing) {
      const [start, end] = doctor.timing.split(" - ");
      setStartTime(start || "");
      setEndTime(end || "");
    }
  }, [doctor]);

  // const handleUpdateDoctorDetails = async () => {
  //   const res = await axios.post(
  //     `http://localhost:3000/updateDoctorDetail/${id}`,
  //     information,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     }
  //   );
  //   if (res === 200) {
  //     alert("doctor updated successfully");
  //     dispatch(setUser(res.data.data));
  //   }
  // };

  const handleUpdateDoctorDetails = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/updateDoctorDetail/${id}`, // Fixed URL
        information, // Sending doctor details
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        alert("Doctor updated successfully");
        setDoctor(res.data.data);
        setInformation(res.data.data);
        dispatch(res.data.data);
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  return (
    <Layout>
      <h1 className="text-center p-1 mb-5 text-[2rem] font-bold uppercase underline">
        Doctor Details
      </h1>

      {/* ----------------------------------------------------------------------- */}
      <form onSubmit={handleFormSubmit}>
        <p className="my-2 text-[1.5rem] font-bold uppercase">
          Personal Information
        </p>
        {/* personal information */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          {/* first name */}
          <div className="flex flex-col">
            <label htmlFor="" className="font-bold">
              <span className="text-red-500 text-sm">*</span> First Name
            </label>
            <input
              type="text"
              placeholder="enter your first name"
              className="border p-1"
              name="firstName"
              value={information.firstName}
              onChange={handleChange}
              required
            />
          </div>
          {/* last name */}
          <div className="flex flex-col">
            <label htmlFor="" className="font-bold">
              <span className="text-red-500 text-sm">*</span> Last Name
            </label>
            <input
              type="text"
              placeholder="enter your last name"
              className="border p-1"
              name="lastName"
              value={information.lastName}
              onChange={handleChange}
              required
            />
          </div>
          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="" className="font-bold">
              <span className="text-red-500 text-sm">*</span> Phone Number
            </label>
            <input
              type="number"
              placeholder="enter your phone number"
              className="border p-1"
              name="phone"
              value={information.phone}
              onChange={handleChange}
              required
            />
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="" className="font-bold">
              <span className="text-red-500 text-sm">*</span> Email
            </label>
            <input
              type="email"
              placeholder="enter your email"
              className="border p-1"
              name="email"
              value={information.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* website */}
          <div className="flex flex-col">
            <label htmlFor="" className="font-bold">
              Website
            </label>
            <input
              type="text"
              placeholder="enter your website url"
              className="border p-1"
              name="website"
              value={information.website}
              onChange={handleChange}
            />
          </div>
          {/* address */}
          <div className="flex flex-col">
            <label htmlFor="" className="font-bold">
              <span className="text-red-500 text-sm">*</span> address
            </label>
            <input
              type="text"
              placeholder="enter your address "
              className="border p-1"
              name="address"
              value={information.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* personal information */}
        <br />
        {/* professional information */}
        <p className="mt-5 text-[1.5rem] font-bold uppercase">
          professional Information
        </p>
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          {/* specialization */}
          <div className="flex flex-col">
            <label htmlFor="" className="font-bold">
              <span className="text-red-500 text-sm">*</span> specialization
            </label>
            <input
              type="text"
              placeholder="enter your specialization"
              className="border p-1"
              name="specialization"
              value={information.specialization}
              onChange={handleChange}
              required
            />
          </div>
          {/* experince */}
          <div className="flex flex-col">
            <label htmlFor="" className="font-bold">
              <span className="text-red-500 text-sm">*</span> experince
            </label>
            <input
              type="text"
              placeholder="enter your experince"
              className="border p-1"
              name="experince"
              value={information.experince}
              onChange={handleChange}
              required
            />
          </div>
          {/* feesPerConsultation */}
          <div className="flex flex-col">
            <label htmlFor="" className="font-bold">
              <span className="text-red-500 text-sm">*</span>{" "}
              feesPerConsultation
            </label>
            <input
              type="number"
              placeholder="enter your feesPerConsultation"
              className="border p-1"
              name="feesPerConsultation"
              value={information.feesPerConsultation}
              onChange={handleChange}
              required
            />
          </div>
          {/* timing */}
          <div className="flex flex-col ">
            <label htmlFor="" className="font-bold">
              <span className="text-red-500 text-sm">*</span> timing
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                className="border p-1"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              />
              <span> - </span>
              <input
                type="time"
                className="border p-1"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        {/* professional information */}
        <button
          type="submit"
          className="w-[6rem] bg-blue-400 p-1 rounded float-right border "
          onClick={handleUpdateDoctorDetails}
        >
          Update
        </button>
      </form>
    </Layout>
  );
};

export default Profile;
