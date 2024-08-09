import User from "../models/user.model.js";

export default class AuthRepository {
  async add(user) {
    try {
      const newUser = User.create(user);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with database");
    }
  }

  async findByEmail(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with database");
    }
  }
}
