import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          backgroundColor: "var(--color-secondary)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
        }}
      >
        Header
      </h1>
      <div style={{ flex: 1, backgroundColor: "#fff", display: "flex" }}>
        <Outlet />
      </div>
      <h1
        style={{
          backgroundColor: "var(--color-secondary)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
        }}
      >
        Footer
      </h1>
    </div>
  );
};

export default DefaultLayout;
