import Property from "../models/property.model.js";
import User from "../models/user.model.js";

export default class UserRepository {
  async updateUserInfo(id, data) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            username: data.username,
            email: data.email,
            password: data.password,
            avatar: data.avatar,
            firstName: data.firstName,
            lastName: data.lastName,
            dob: data.dob,
            phoneNumber: data.phoneNumber,
            address: data.address,
            city: data.city,
          },
        },
        { new: true }
      );

      // updatedUser.markModified("date");
      // updatedUser.save();

      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with database");
    }
  }

  async findUserById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with database");
    }
  }

  async findUserByIdAndDelete(id) {
    try {
      await User.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with database");
    }
  }

  async getAll(id) {
    try {
      return await Property.find({ userRef: id });
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with database");
    }
  }
}
