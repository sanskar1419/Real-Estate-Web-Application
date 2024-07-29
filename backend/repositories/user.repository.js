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
    }
  }
}
