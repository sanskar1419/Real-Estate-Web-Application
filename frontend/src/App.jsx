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
import toast, { ToastBar, Toaster } from "react-hot-toast";

export default function App() {
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
          element: <SignIn />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <div>
        <Toaster
          position="bottom-right"
          reverseOrder={true}
          toastOptions={{
            success: {
              style: {
                minWidth: "400px",
              },
            },
            error: {
              style: {
                minWidth: "400px",
              },
            },
          }}
        >
          {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {t.type !== "loading" && (
                    <button onClick={() => toast.dismiss(t.id)}>X</button>
                  )}
                </>
              )}
            </ToastBar>
          )}
        </Toaster>
      </div>
    </>
  );
}
