export class MachineryModel {
 constructor(resource = {}) {
  this.id = resource.id ?? null
  this.modelName = resource.modelName ?? null
  this.manufacturer = resource.manufacturer ?? null
  this.idSection = resource.idSection ?? null
 }
}
