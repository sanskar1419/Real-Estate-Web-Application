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
      const validUser = await this.authRepository.findByEmail(email);
      if (validUser) return next(errorHandler("400", "User Already Exist"));
      // if (password !== confirmPassword)
      //   return next(
      //     errorHandler("400", "Password and confirm password mismatch")
      //   );
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = await this.authRepository.add({
        username,
        email,
        password: hashedPassword,
      });

      if (!newUser) return next(errorHandler(500, "Something went wrong"));
      generateTokenAndSetCookie(newUser._id, res);

      const { password: pass, ...rest } = newUser._doc;

      res.status(201).json(rest);
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

  async googleOAuth(req, res, next) {
    try {
      const user = await this.authRepository.findByEmail(req.body.email);
      if (user) {
        generateTokenAndSetCookie(user._id, res);
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = await this.authRepository.add({
          username:
            req.body.name.split(" ").join("").toLowerCase() +
            Math.random().toString(36).slice(-4),
          password: hashedPassword,
          email: req.body.email,
          avatar: req.body.photo,
          firstName: req.body.name.split(" ")[0] || "",
          lastName: req.body.name.split(" ")[1] || "",
        });
        generateTokenAndSetCookie(newUser._id, res);
        const { password: pass, ...rest } = newUser._doc;
        res.status(200).json(rest);
      }
    } catch (error) {
      next(error);
    }
  }

  async facebookAuth(req, res, next) {
    try {
      const user = await this.authRepository.findByEmail(req.body.email);
      if (user) {
        generateTokenAndSetCookie(user._id, res);
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = await this.authRepository.add({
          username:
            req.body.name.split(" ").join("").toLowerCase() +
            Math.random().toString(36).slice(-4),
          password: hashedPassword,
          email: req.body.email,
          avatar: req.body.photo,
          firstName: req.body.name.split(" ")[0] || "",
          lastName: req.body.name.split(" ")[1] || "",
        });
        generateTokenAndSetCookie(newUser._id, res);
        const { password: pass, ...rest } = newUser._doc;
        res.status(200).json(rest);
      }
    } catch (error) {
      next(error);
    }
  }

  async githubAuth(req, res, next) {
    try {
      const user = await this.authRepository.findByEmail(req.body.email);
      if (user) {
        generateTokenAndSetCookie(user._id, res);
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = await this.authRepository.add({
          username:
            req.body.name.split(" ").join("").toLowerCase() +
            Math.random().toString(36).slice(-4),
          password: hashedPassword,
          email: req.body.email,
          avatar: req.body.photo,
          firstName: req.body.name.split(" ")[0] || "",
          lastName: req.body.name.split(" ")[1] || "",
        });
        generateTokenAndSetCookie(newUser._id, res);
        const { password: pass, ...rest } = newUser._doc;
        res.status(200).json(rest);
      }
    } catch (error) {
      next(error);
    }
  }
}
