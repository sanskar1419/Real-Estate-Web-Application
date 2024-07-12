import UserRepository from "../repositories/user.repository.js";

export default class UserController {
  UserController() {
    this.userRepository = new UserRepository();
  }
}
