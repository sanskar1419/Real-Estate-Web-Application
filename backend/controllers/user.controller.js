import bcryptjs from "bcryptjs";
import UserRepository from "../repositories/user.repository.js";
import { errorHandler } from "../utils/errorHandler.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async updateUser(req, res, next) {
    try {
      if (req.user.userId !== req.params.id)
        return next(errorHandler(401, "You can only update your own account!"));

      if (req.body.password && req.body.password != "") {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }

      const updatedUser = await this.userRepository.updateUserInfo(
        req.params.id,
        { ...req.body }
      );

      if (updatedUser == null || updatedUser == undefined)
        return next(errorHandler(500, "Something Went Wrong"));

      const { password, ...rest } = updatedUser._doc;

      res.status(200).json(rest);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      console.log("hii");
      if (req.params.id != req.user.userId)
        return next(errorHandler(400, "You can delete only your own account"));
      const user = await this.userRepository.findUserById(req.params.id);
      if (!user) next(errorHandler(400, "User does not exist"));

      await this.userRepository.findUserByIdAndDelete(req.params.id);
      res.clearCookie("access_token");
      res.status(200).json("User has been deleted!");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
