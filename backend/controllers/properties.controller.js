import PropertyRepository from "../repositories/properties.repository.js";
import { errorHandler } from "../utils/errorHandler.js";

export default class PropertyController {
  constructor() {
    this.propertiesRepository = new PropertyRepository();
  }

  async createNewProperty(req, res, next) {
    try {
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

  async deleteProperty(req, res, next) {
    try {
      const property = await this.propertiesRepository.findById(req.params.id);
      console.log(property);
      if (!property) return next(errorHandler(404, "Property doesn't exist"));

      // console.log(
      //   req.user.userId +
      //     "  " +
      //     property.userRef._id +
      //     " " +
      //     (req.user.userId !== property.userRef._id) +
      //     " " +
      //     (req.user.userId !== property.userRef.id)
      // );

      if (req.user.userId !== property.userRef.id)
        return next(
          errorHandler(401, "You are unauthorized to delete this property")
        );

      await this.propertiesRepository.delete(req.params.id);

      return res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateProperty(req, res, next) {
    try {
      const property = await this.propertiesRepository.findById(req.params.id);
      if (!property) return next(errorHandler(404, "Property not found"));

      if (property.userRef.id !== req.user.userId)
        return next(
          errorHandler(401, "You are unauthorized to update this property")
        );

      const updatedProperty = await this.propertiesRepository.update(
        req.params.id,
        { ...req.body }
      );

      if (!updatedProperty)
        return next(errorHandler(500, "Something Went Wrong"));

      res.status(200).json(updatedProperty);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getProperty(req, res, next) {
    try {
      const property = await this.propertiesRepository.findById(req.params.id);
      if (!property) return next(errorHandler(404, "Property not found"));
      return res.status(200).json(property);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
