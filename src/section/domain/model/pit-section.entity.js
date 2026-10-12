export class PitSection {
 constructor(resource = {}) {
  this.id = resource.id ?? null
  this.name = resource.name ?? null
  this.maxOperatingHours = resource.maxOperatingHours ?? null
 }
}
