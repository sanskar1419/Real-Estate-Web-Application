import bcryptjs from "bcryptjs";
import AuthRepository from "../repositories/auth.repository.js";
import { errorHandler } from "../utils/errorHandler.js";
import generateTokenAndSetCookie from "../utils/generateJWT.js";

export default class AuthController {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async signUp(req, res, next) {
    try {
      const { username, email, password, confirmPassword } = req.body;
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = await this.authRepository.add({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).json("User Registered Successfully");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const validUser = await this.authRepository.findByEmail(email);
      if (!validUser) return next(errorHandler(404, "User not found!"));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
      generateTokenAndSetCookie(validUser._id, res);
      const { password: pass, ...rest } = validUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
