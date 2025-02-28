import { FaHome, FaListUl, FaUserMd, FaUser } from "react-icons/fa";

export const userMenu = [
  {
    name: "Home",
    path: "/",
    icon: <FaHome />,
  },
  {
    name: "Appointment",
    path: "/appointment",
    icon: <FaListUl />,
  },
  {
    name: "Apply Doctor",
    path: "/apply-doctor",
    icon: <FaUserMd />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
];

export const adminMenu = [
  {
    name: "Home",
    path: "/",
    icon: <FaHome />,
  },
  {
    name: "Doctors",
    path: "/doctor",
    icon: <FaUserMd />,
  },
  {
    name: "user",
    path: "/user",
    icon: <FaListUl />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
];
