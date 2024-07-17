import React from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

export default function Notification() {
  return (
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
  );
}
