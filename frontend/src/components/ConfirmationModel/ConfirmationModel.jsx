import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, userActions } from "../../redux/slices/user.slice";

export default function ConfirmationModel({
  setShowConfirmationModel,
  confirmationMessage,
}) {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  const handleDeleteUser = async () => {
    try {
      dispatch(userActions.deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(userActions.updateError(data.message));
        return;
      }
      dispatch(userActions.deleteSuccess(data));
      localStorage.removeItem("logged-in-user");
    } catch (error) {
      console.log(error);
      dispatch(userActions.deleteError(error.message));
    }
  };
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
          <div className="flex gap-2 justify-end">
            {/* if there is a button, it will close the modal */}
            <button
              className="btn btn-outline btn-error btn-sm rounded-lg"
              onClick={() => setShowConfirmationModel(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-outline btn-success btn-sm rounded-lg flex items-center justify-center"
              onClick={handleDeleteUser}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
