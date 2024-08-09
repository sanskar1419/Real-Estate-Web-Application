import PropertyRepository from "../repositories/properties.repository";

export default class PropertyController {
  constructor() {
    this.propertiesRepository = new PropertyRepository();
  }
}
