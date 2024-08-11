import PropertyRepository from "../repositories/properties.repository.js";
import { errorHandler } from "../utils/errorHandler.js";

export default class PropertyController {
  constructor() {
    this.propertiesRepository = new PropertyRepository();
  }

  async createNewProperty(req, res, next) {
    try {
      console.log(req.body);
      const property = await this.propertiesRepository.create({
        ...req.body,
        userRef: req.user.userId,
      });
      if (!property) next(errorHandler("400", "Unable add new property"));
      return res.status(201).json(property);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
