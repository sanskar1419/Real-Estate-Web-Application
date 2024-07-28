import UserRepository from "../repositories/user.repository.js";

export default class UserController {
  UserController() {
    this.userRepository = new UserRepository();
  }

  async updateUser(req, res, next) {
    try {
      const userId = req.params.id;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
