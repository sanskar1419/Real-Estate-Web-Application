import Property from "../models/property.model.js";

export default class PropertyRepository {
  async create(data) {
    try {
      const newProperty = await Property.create({ ...data });
      return newProperty;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with database");
    }
  }
}
