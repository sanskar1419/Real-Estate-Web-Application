import bcryptjs from "bcryptjs";
import AuthRepository from "../repositories/auth.repository.js";

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
}
