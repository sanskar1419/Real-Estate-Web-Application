import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Notification from "./components/Notifications/Notification.jsx";
import { useSelector } from "react-redux";
import { getCurrentUser } from "./redux/slices/user.slice.js";
import AddNewProperty from "./pages/AddNewProperty/AddNewProperty.jsx";
import UpdateProperty from "./pages/UpdateProperty/UpdateProperty.jsx";

export default function App() {
  const currentUser = useSelector(getCurrentUser);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/sign-in",
          element: currentUser ? <Navigate to="/" /> : <SignIn />,
        },
        {
          path: "/sign-up",
          element: currentUser ? <Navigate to="/" /> : <SignUp />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/profile",
          element: currentUser ? <Profile /> : <Navigate to="/" />,
        },
        {
          path: "/create-property",
          element: currentUser ? <AddNewProperty /> : <Navigate to="/" />,
        },
        {
          path: "/update-property/:id",
          element: currentUser ? <UpdateProperty /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Notification />
    </>
  );
}
