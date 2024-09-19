import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { notificationAction } from "../../redux/slices/notification.slice";
import { DNA } from "react-loader-spinner";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  Pagination,
  Navigation,
  Mousewheel,
  EffectFade,
  Keyboard,
} from "swiper/modules";

export default function PropertyDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(property);

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
        <div className="w-full min-h-[88vh] sm:min-h-[88vh] relative shadow-2xl shadow-black-100 flex items-start flex-col  lg:flex-row overflow-y-auto no-scrollbar text-[#adbbda]">
          <div className="w-full h-[50vh] xl:h-[89vh] lg:h-[80vh] md:h-[70vh] sm:h-[60vh]  overflow-hidden flex items-center justify-center">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              navigation={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              keyboard={{
                enabled: true,
              }}
              modules={[Navigation, Autoplay, Keyboard]}
              className="mySwiper"
            >
              {property.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-full flex items-center justify-center opacity-40 bg-cover">
                    <img src={url} className="w-full h-full bg-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <div className="w-full h-[100vh] flex items-center justify-center bg-[url('./assets/images/background5.jpg')] ">
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

/* 
<div className="w-full">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >
            {property.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full flex items-center justify-center">
                  <img src={url} className="w-full" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
*/
