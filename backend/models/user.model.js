import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, maxLength: 15, default: "" },
    lastName: { type: String, maxLength: 15, default: "" },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      default: new Date(),
    },
    phoneNumber: { type: Number, default: 123456780 },
    address: { type: String, default: "city, state country" },
    city: { type: String, default: "City" },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
