export class Telemetry {
 constructor(resource = {}) {
  this.id = resource.id ?? null
  this.inspectionRecordId = resource.inspectionRecordId ?? null
  this.machineryCode = resource.machineryCode ?? null
  this.modelId = resource.modelId ?? null
  this.pitSectionId = resource.pitSectionId ?? null
  this.operatingHours = resource.operatingHours ?? null
  this.engineTemperatureC = resource.engineTemperatureC ?? null
  this.oilPressurePsi = resource.oilPressurePsi ?? null
  this.vibrationMmS = resource.vibrationMmS ?? null
  this.alertTriggered = resource.alertTriggered ?? null
  this.registeredAt = resource.registeredAt ?? null
 }
}
