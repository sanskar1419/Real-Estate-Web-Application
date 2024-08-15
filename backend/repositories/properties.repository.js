import Property from "../models/property.model.js";

export default class PropertyRepository {
  async create(data) {
    try {
      const newProperty = await Property.create({ ...data });
      return newProperty;
    } catch (error) {
      throw new Error("Something went wrong with database");
    }
  }

  async findById(id) {
    try {
      return await Property.findById(id).populate("userRef");
    } catch (error) {
      throw new Error("Something Wrong with the database");
    }
  }

  async delete(id) {
    try {
      await Property.findByIdAndDelete(id);
      return;
    } catch (error) {
      throw new Error("Something Wrong with the database");
    }
  }

  async update(id, data) {
    try {
      return await Property.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (error) {
      throw new Error("Something wrong with the database");
    }
  }
}
