import React, { useEffect, useState } from "react";
import styles from "./UpdateProperty.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getError,
  getMessage,
  notificationAction,
} from "../../redux/slices/notification.slice";
import toast from "react-hot-toast";
import houseImg from "../../assets/images/house.png";
import locationImg from "../../assets/images/location.png";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import {
  getPropertyLoadingState,
  propertyActions,
} from "../../redux/slices/propertySlice";
import RiseLoader from "react-spinners/RiseLoader";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProperty() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(getError);
  const message = useSelector(getMessage);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    propertyName: "",
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
  const [showImagePreviewIndex, setShowImagePreviewIndex] = useState(-1);
  const loading = useSelector(getPropertyLoadingState);

  useEffect(() => {
    const getProperty = async () => {
      console.log(id);
    };
    getProperty();
  }, []);

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

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      // setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          dispatch(
            notificationAction.setMessage(
              "🙌🙌🙌Hurray all files are uploaded successfully🙌🙌🙌"
            )
          );
          setUploading(false);
        })
        .catch((err) => {
          dispatch(
            notificationAction.setError(
              "Image upload failed (2 mb max per image)"
            )
          );
          // setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      dispatch(
        notificationAction.setError("You can only upload 6 images per property")
      );
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (formData.imageUrls.length < 1)
        return dispatch(
          notificationAction.setError("You must upload at least one image")
        );
      if (+formData.regularPrice < +formData.discountPrice)
        return dispatch(
          notificationAction.setError(
            "Discount price must be lower than regular price"
          )
        );

      dispatch(propertyActions.addStart());
      const res = await fetch("/api/properties/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(propertyActions.addError(data.message));
        return;
      }
      dispatch(propertyActions.addSuccess(data));
      navigate(`/create-property/${data._id}`);
    } catch (error) {
      dispatch(propertyActions.addError(error.message));
    }
  };

  return (
    <div
      className={`w-full min-h-[88vh] lg:min-h-[88vh] h-[88vh] relative shadow-2xl shadow-black-100 flex justify-center sm:min-h-[90vh] lg:flex-row bg-blue-gradient text-[#adbbda]`}
    >
      <div className=" bg-[url('./assets/images/background5.jpg')] opacity-25 w-full h-full absolute z-[-10] bg-cover bg-center"></div>
      {showImagePreviewIndex != -1 && (
        <ImagePreview
          currentImageIndex={showImagePreviewIndex}
          images={formData.imageUrls}
          setShowImagePreviewIndex={setShowImagePreviewIndex}
        />
      )}
      <div className="p-5 max-w-[90%] xl:max-w-[75%] relative max-h-full cursive">
        <h1 className="text-3xl font-semibold text-center">Edit Property</h1>
        <div className="divider divider-accent"></div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row gap-8 overflow-y-auto no-scrollbar max-h-[80%]"
        >
          <div className="flex flex-col gap-4 flex-1 lg:max-h-full lg:overflow-y-auto lg:no-scrollbar lg:pb-5">
            <div className="w-full">
              <div className="mb-3 text-sm text-second">Property Name</div>
              <label className="input input-bordered flex items-center gap-2 rounded-lg">
                <img alt="id card" src={houseImg} className="w-4" />
                <input
                  type="text"
                  id="propertyName"
                  className="grow"
                  placeholder="Property Name"
                  minLength="10"
                  maxLength="70"
                  defaultValue={formData.propertyName}
                  onChange={handleChange}
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
                onChange={handleChange}
                defaultValue={formData.description}
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
                  onChange={handleChange}
                  defaultValue={formData.address}
                />
              </label>
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="checkbox checkbox-warning rounded-lg "
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="checkbox checkbox-warning rounded-lg"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="checkbox checkbox-warning rounded-lg"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="checkbox checkbox-warning rounded-lg"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="checkbox checkbox-warning rounded-lg"
                  onChange={handleChange}
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
                  onChange={handleChange}
                  defaultValue={formData.bedrooms}
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
                  onChange={handleChange}
                  defaultValue={formData.bathrooms}
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
                  onChange={handleChange}
                  defaultValue={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">( &#x20b9; / month)</span>
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
                    onChange={handleChange}
                    defaultValue={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Discounted price</p>

                    {formData.type === "rent" && (
                      <span className="text-xs">(&#x20b9; / month)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4 lg:max-h-full lg:overflow-y-auto lg:no-scrollbar pb-4">
            <p className="text-sm text-second">
              Images:
              <span className="ml-2 text-[#adbbda]">
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
                onChange={(e) => setFiles(e.target.files)}
              />
              <button
                type="button"
                className="btn btn-outline btn-success rounded-lg"
                onClick={handleImageSubmit}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between items-center px-5"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="max-w-20 max-h-30 object-contain rounded-lg shadow-sm shadow-white cursor-pointer"
                    onClick={() => setShowImagePreviewIndex(index)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="btn btn-outline btn-error rounded-lg btn-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              className="btn btn-outline btn-success rounded-lg"
              type="submit"
              disabled={loading || uploading}
            >
              {loading ? <RiseLoader /> : "Update Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
