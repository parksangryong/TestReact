import { FaBeer, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { fetchLogout } from "../services/api/authService";

import { getData } from "../utils/AsyncStorage";
import { USER_ID_KEY } from "../services/config/config";

const Header = () => {
  const userId = getData(USER_ID_KEY)?.idx;
  const navigate = useNavigate();

  const logout = async () => {
    await fetchLogout();
    navigate("/auth/login");
  };

  return (
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
  );
};

export default Header;
