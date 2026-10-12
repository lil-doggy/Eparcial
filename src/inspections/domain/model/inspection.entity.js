export class Inspection {
 constructor(resource = {}) {
  this.id = resource.id ?? null
  this.machineryCode = resource.machineryCode ?? null
  this.modelId = resource.modelId ?? null
  this.pitSectionId = resource.pitSectionId ?? null
  this.inspectorName = resource.inspectorName ?? null
  this.status = resource.status ?? null
  this.notes = resource.notes ?? null
  this.inspectedAt = resource.inspectedAt ?? null
  this.operatingHours = resource.operatingHours ?? null
  this.maxOperatingHours = resource.maxOperatingHours ?? null
 }
}
