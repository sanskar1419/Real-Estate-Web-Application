import React, { useEffect, useState } from "react";
import styles from "./AddNewProperty.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getError,
  getMessage,
  notificationAction,
} from "../../redux/slices/notification.slice";
import toast from "react-hot-toast";
import idImg from "../../assets/images/id-card.png";
import locationImg from "../../assets/images/location.png";

export default function AddNewProperty() {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const message = useSelector(getMessage);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

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
      className={`w-full min-h-[88vh] lg:min-h-[88vh] h-[88vh] relative shadow-2xl shadow-black-100 flex justify-center sm:min-h-[90vh] lg:flex-row bg-blue-gradient text-[#adbbda]`}
    >
      <div className=" bg-[url('./assets/images/background5.jpg')] opacity-25 w-full h-full absolute z-[-10] bg-cover bg-center"></div>
      <div className="p-5 max-w-[90%] xl:max-w-[75%] relative max-h-full cursive">
        <h1 className="text-3xl font-semibold text-center">
          Add A New Property
        </h1>
        <div className="divider divider-accent"></div>
        <form
          // onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-8 max-h-[80%]"
        >
          <div className="flex flex-col gap-4 flex-1 max-h-full overflow-y-auto no-scrollbar">
            <div className="w-full">
              <div className="mb-3 text-sm text-second">First Name</div>
              <label className="input input-bordered flex items-center gap-2 rounded-lg">
                <img alt="id card" src={idImg} className="w-4" />
                <input
                  type="text"
                  id="firstName"
                  className="grow"
                  placeholder="First Name"
                  // defaultValue={formData.firstName || currentUser.firstName}
                  // onChange={handleFormData}
                />
              </label>
            </div>
            <div className="w-full">
              <div className="mb-3 text-sm text-second">Description</div>
              <textarea
                className="textarea textarea-accent w-full rounded-xl"
                type="text"
                placeholder="Description"
                id="description"
                required
                // onChange={handleChange}
                value={formData.description}
              ></textarea>
            </div>

            <div className="w-full">
              <div className="mb-3 text-sm text-second">Address</div>
              <label className="input input-bordered flex items-center gap-2 rounded-lg">
                <img alt="id card" src={locationImg} className="w-4" />
                <input
                  type="text"
                  placeholder="Address"
                  className="grow"
                  id="address"
                  required
                  // onChange={handleChange}
                  value={formData.address}
                />
              </label>
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="checkbox checkbox-warning rounded-lg "
                  // onChange={handleChange}
                  // checked={formData.type === "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="checkbox checkbox-warning rounded-lg"
                  // onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="checkbox checkbox-warning rounded-lg"
                  // onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="checkbox checkbox-warning rounded-lg"
                  // onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="checkbox checkbox-warning rounded-lg"
                  // onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  // onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  // onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  // onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">( / month)</span>
                  )}
                </div>
              </div>
              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="10000000"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                    //   onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Discounted price</p>

                    {formData.type === "rent" && (
                      <span className="text-xs">($ / month)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4 max-h-full overflow-y-auto no-scrollbar">
            <p className="text-sm text-second">
              Images:
              <span className="ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4 mb-4">
              <input
                type="file"
                className="file-input file-input-bordered file-input-warning rounded-lg w-full max-w-xs"
                id="images"
                accept="image/*"
                multiple
                //   onChange={(e) => setFiles(e.target.files)}
              />
              <button
                className="btn btn-outline btn-success rounded-lg"
                onClick={() => setEdit(false)}
              >
                {/* {uploading ? "Uploading..." : "Upload"} */}
                Upload
              </button>
            </div>
            {/* <p className="text-red-700 text-sm">
                {imageUploadError && imageUploadError}
              </p> */}
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    //   onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              className="btn btn-outline btn-success rounded-lg"
              type="submit"
            >
              {/* {uploading ? "Uploading..." : "Upload"} */}
              Create Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
