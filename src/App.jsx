import React from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProtectRoute from "./components/ProtectRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Appointment from "./pages/Appointment";
import Profile from "./pages/admin/Profile";
import NotificationPage from "./pages/NotificationPage";
import Doctor from "./pages/admin/Doctor";
import User from "./pages/admin/User";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <ProtectRoute>
              <ApplyDoctor />
            </ProtectRoute>
          }
        />
        <Route
          path="/appointment"
          element={
            <ProtectRoute>
              <Appointment />
            </ProtectRoute>
          }
        />
        <Route
          path="/notification"
          element={
            <ProtectRoute>
              <NotificationPage />
            </ProtectRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <ProtectRoute>
              <Doctor />
            </ProtectRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectRoute>
              <User />
            </ProtectRoute>
          }
        />
        <Route
          path="/doctor/profile/:id"
          element={
            <ProtectRoute>
              <Profile />
            </ProtectRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
