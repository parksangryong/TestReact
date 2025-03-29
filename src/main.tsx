// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routes from "./routes";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <Routes />
    <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
  </>
  // </StrictMode>
);
