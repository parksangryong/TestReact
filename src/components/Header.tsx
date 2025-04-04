import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// icons
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaBeer,
  FaHome,
  FaImage,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";

// utils
import { getData } from "../utils/AsyncStorage";

// constants
import { USER_ID_KEY } from "../services/config/config";

// hooks
import { useLogout } from "../hooks/useAuth";

const Header = () => {
  const userId = getData(USER_ID_KEY)?.idx;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const { mutateAsync: logoutMutate } = useLogout();

  const logout = async () => {
    await logoutMutate();
  };

  return (
    <>
      <div
        style={{
          height: "60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          borderBottom: "5px solid #dd0000",
          minHeight: "60px",
        }}
      >
        <span
          onClick={() => navigate("/")}
          style={{
            fontFamily: "Bungee Tint",
            fontSize: "19px",
            top: 2,
            position: "relative",
          }}
        >
          Test-Project
        </span>
        {userId ? (
          <FaSignOutAlt size={20} color="#dd0000" onClick={logout} />
        ) : (
          <FaBeer size={20} color="#dd0000" />
        )}
      </div>
      <div
        style={{
          position: "absolute",
          width: "25px",
          height: "25px",
          minHeight: "25px",
          cursor: "pointer",
          backgroundColor: "#dd0000",
          top: !isOpen ? 60 : 100,
          transition: "all 0.7s ease",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? (
          <FaArrowAltCircleDown size={15} color="#fff" />
        ) : (
          <FaArrowAltCircleUp size={15} color="#fff" />
        )}
      </div>
      <div
        style={{
          height: isOpen ? "40px" : "0",
          minHeight: isOpen ? "40px" : "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.7s ease",
          borderBottom: "5px solid #dd0000",
          overflow: "hidden",
          gap: "40px",
        }}
      >
        <NavLink to="/" className="header-nav-link">
          <FaHome />
        </NavLink>
        <NavLink to="/image" className="header-nav-link">
          <FaImage />
        </NavLink>
        <NavLink to="/setting" className="header-nav-link">
          <FaCog />
        </NavLink>
      </div>
    </>
  );
};

export default Header;
