import bcryptjs from "bcryptjs";
import AuthRepository from "../repositories/auth.repository.js";

export default class AuthController {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async signUp(req, res) {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = await this.authRepository.add({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
