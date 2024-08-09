import PropertyRepository from "../repositories/properties.repository.js";

export default class PropertyController {
  constructor() {
    this.propertiesRepository = new PropertyRepository();
  }

  async createNewProperty(req, res, next) {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
