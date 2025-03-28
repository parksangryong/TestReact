import { FaBeer } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
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
      <FaBeer size={20} color="#dd0000" />
    </div>
  );
};

export default Header;
