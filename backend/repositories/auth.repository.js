import User from "../models/user.model.js";

export default class AuthRepository {
  async add(user) {
    try {
      const newUser = User.create(user);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
}
