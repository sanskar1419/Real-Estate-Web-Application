import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { notificationAction } from "../../redux/slices/notification.slice";
import { DNA } from "react-loader-spinner";

export default function PropertyDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/properties/get-property/${id}`);
        const data = await res.json();
        if (data.success == false) {
          dispatch(notificationAction.setError("Something Went Wrong"));
          setLoading(false);
          return;
        }
        setProperty(data);
        setLoading(false);
      } catch (error) {
        dispatch(notificationAction.setError(error.message));
        setLoading(false);
      }
    };
    fetchPropertyData();
  }, [id]);

  return (
    <>
      {property ? (
        <p>{property.description}</p>
      ) : (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
    </>
  );
}
