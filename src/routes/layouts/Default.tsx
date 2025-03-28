import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const DefaultLayout = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div style={{ flex: 1, backgroundColor: "#fff", display: "flex" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
