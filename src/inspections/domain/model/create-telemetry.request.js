export class CreateTelemetryRequest {
 constructor(inspection, form) {
  this.inspectionRecordId = inspection.id
  this.machineryCode = inspection.machineryCode
  this.modelId = inspection.modelId
  this.pitSectionId = inspection.pitSectionId
  this.operatingHours = form.operatingHours
  this.engineTemperatureC = form.engineTemperatureC
  this.oilPressurePsi = form.oilPressurePsi
  this.vibrationMmS = form.vibrationMmS
  this.alertTriggered = Boolean(form.alertTriggered)
  this.registeredAt = new Date().toISOString()
 }
}
