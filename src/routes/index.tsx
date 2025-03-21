import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

// Layouts
import DefaultLayout from "./layouts/Default";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const loader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/auth/login");
  }
  return null;
};

const unLoader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return redirect("/");
  }
  return null;
};
const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    path: "/",
    loader: loader,
    children: [
      {
        element: <Home />,
        index: true,
      },
    ],
  },
  {
    element: <DefaultLayout />,
    path: "/auth",
    loader: unLoader,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Error</div>,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
