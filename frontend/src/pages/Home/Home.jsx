import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getError,
  getMessage,
  notificationAction,
} from "../../redux/slices/notification.slice";
import toast from "react-hot-toast";
import Section from "../../components/Section";
import Button from "../../components/Button/Button";
import { curve, heroBackground, robot } from "../../assets";
import Hero from "../../components/Hero";

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
    <div className="pt-[4.75rem] lg:pt-[5.25rem] h-screen overflow-y-auto overflow-x-hidden no-scrollbar">
      <Hero />
    </div>
  );
}
