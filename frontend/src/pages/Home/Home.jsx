import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getError,
  getMessage,
  notificationAction,
} from "../../redux/slices/notification.slice";
import toast from "react-hot-toast";

export default function Home() {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const message = useSelector(getMessage);

  useEffect(() => {
    if (message != null) {
      toast.success(message);
      dispatch(notificationAction.resetMessage());
    }
    if (error != null) {
      toast.error(error);
      dispatch(notificationAction.resetError());
    }
  }, [message, error]);

  return (
    <div
      className={`w-full min-h-[88vh] lg:min-h-[88vh] h-[88vh] relative shadow-2xl shadow-black-100 flex items-center flex-col sm:min-h-[90vh] lg:flex-row overflow-y-auto no-scrollbar bg-blue-gradient text-[#adbbda]`}
    >
      <div className=" bg-[url('./assets/images/background8.jpg')] opacity-25 w-full h-full absolute z-[-10] bg-cover bg-center"></div>
      <div />
    </div>
  );
}
