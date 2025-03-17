import React, { useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/user";

const NotificationPage = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("unread");

  const navigate = useNavigate();

  // handle all read notification
  const handleMarkAllRead = async () => {
    try {
      console.log("Sending userId:", user._id);
      const res = await axios.post(
        "http://localhost:3000/get-All-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        alert("All notifications marked as read");
        dispatch(setUser(res.data.data));
      }
    } catch (error) {
      console.log("error");
    }
  };

  // handle all delete notification
  const handleDeleteAllNotification = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/delete-All-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        alert("delete notifications successfully");
        dispatch(setUser(res.data.data));
      }
    } catch (error) {
      if (error.res) {
        alert(error.response.data.message);
      }
    }
  };
  return (
    <Layout>
      <h1 className="text-2xl text-center py-1 mb-5">Notification</h1>
      {/* notofication ko show karayenge */}
      <div className="flex  gap-5 border-b mb-4">
        <button
          className={`px-4 py-2 mx-2 cursor-pointer ${
            activeTab === "unread" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("unread")}
        >
          UnRead Notification
        </button>
        <button
          className={`px-4 py-2 mx-2  cursor-pointer ${
            activeTab === "read" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("read")}
        >
          Read Notification
        </button>
      </div>

      {/* --------------notifications-------------------------------------------------- */}
      {activeTab === "unread" && (
        <div className="p-4">
          <p
            className="flex text-xl cursor-pointer justify-end font-bold"
            onClick={handleMarkAllRead}
          >
            Marked All Read
          </p>
          {user?.notification?.map((notification, index) => (
            <div key={index}>
              <p
                className=" py-2 cursor-pointer my-2"
                onClick={() => navigate(notification.data.onClickPath)}
              >
                {index + 1}
                {"  . "} {notification.message}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ----------------------------------------------------------------------- */}
      {activeTab === "read" && (
        <div className="p-4">
          <p
            className="flex text-xl cursor-pointer justify-end font-bold"
            onClick={handleDeleteAllNotification}
          >
            Delete All Read
          </p>
          {user?.seennotification?.map((notification, index) => (
            <div key={index}>
              <p
                className=" py-2 cursor-pointer my-2"
                onClick={() => navigate(notification.data.onClickPath)}
              >
                {index + 1}
                {"  . "} {notification.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default NotificationPage;
