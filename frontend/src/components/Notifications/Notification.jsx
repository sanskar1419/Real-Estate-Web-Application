import React from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

export default function Notification() {
  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
        toastOptions={{
          duration: 5000,
          success: {
            style: {
              minWidth: "400px",
              background: "linear-gradient(45deg,#5dbea3,#5adbb5)",
              color: "#141010",
              fontFamily: "cursive",
              fontSize: "0.8rem",
              boxShadow: "inset 0 4px 6px 0 black , inset 0 6px 8px 0 #5adbb5",
              textAlign: "center",
            },
          },
          error: {
            style: {
              minWidth: "400px",
              background: "linear-gradient(45deg,#ED4337,#ff0033)",
              color: "#adbbda",
              fontFamily: "cursive",
              fontSize: "0.8rem",
              boxShadow: "inset 0 4px 6px 0 black , inset 0 6px 8px 0 #ff0033",
              textAlign: "center",
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
  );
}
