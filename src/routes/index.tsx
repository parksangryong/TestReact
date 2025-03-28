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
import BoardDetail from "./pages/BoardDetail";
import ImageList from "./pages/ImageList";
import Setting from "./pages/Setting";

// styles
import "mirr-ui/styles";
import "@fontsource/noto-sans/400.css"; // Specify weight
import "@fontsource/noto-sans/400-italic.css"; // Specify weight and style
import "@fontsource/bungee-tint/400.css"; // Specify weight
import "@fontsource/bungee-shade/400.css"; // Specify weight
import "@fontsource/bungee-inline/400.css"; // Specify weight
import "@fontsource/bungee-hairline/400.css";

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
      {
        element: <BoardDetail />,
        path: "board/:id",
      },
      {
        element: <ImageList />,
        path: "image",
      },
      {
        element: <Setting />,
        path: "setting",
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
