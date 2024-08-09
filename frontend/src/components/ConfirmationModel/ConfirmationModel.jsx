import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/slices/user.slice";

export default function ConfirmationModel({
  setShowConfirmationModel,
  confirmationMessage,
}) {
  const currentUser = useSelector(getCurrentUser);
  return (
    <dialog
      id="my_modal_4"
      className="w-full h-full bg-transparent flex items-center justify-center fixed outline top-0 backdrop-blur-sm z-20"
    >
      <div className="modal-box w-[90%] md:w-1/2 sm:w-[70%] max-w-xl rounded-xl fourth-color shadow-inner shadow-slate-700">
        <h3 className="font-bold text-lg">
          Hello! {currentUser.username.toUpperCase()}
        </h3>
        <p className="py-4">{confirmationMessage}</p>
        <div className="w-full">
          <form className="flex gap-2 justify-end">
            {/* if there is a button, it will close the modal */}
            <button
              className="btn btn-outline btn-error btn-sm rounded-lg"
              onClick={() => setShowConfirmationModel(false)}
            >
              Cancel
            </button>
            <button className="btn btn-outline btn-success btn-sm rounded-lg flex items-center justify-center">
              Proceed
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
