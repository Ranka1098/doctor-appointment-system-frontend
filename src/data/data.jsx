import { FaHome, FaListUl, FaUserMd, FaUser } from "react-icons/fa";

const sidebarMenu = [
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
export default sidebarMenu;
