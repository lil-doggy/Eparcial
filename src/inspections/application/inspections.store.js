import { defineStore } from 'pinia'
import { ref } from 'vue'
import { InspectionsApi } from '../infrastructure/inspections-api.js'
import { InspectionAssembler } from '../infrastructure/inspection.assembler.js'
import { TelemetryAssembler } from '../infrastructure/telemetry.assembler.js'
import { CreateTelemetryRequest } from '../domain/model/create-telemetry.request.js'
export const useInspectionsStore = defineStore('inspections', () => {
 const inspections = ref([]), telemetry = ref([]), loading = ref(false), saving = ref(false), error = ref('')
 const api = new InspectionsApi()
 async function load() {
  loading.value = true; error.value = ''
  try {
   const [records, readings] = await Promise.all([api.inspections.getAll(), api.telemetry.getAll()])
   inspections.value = InspectionAssembler.toEntitiesFromResponse(records)
   telemetry.value = TelemetryAssembler.toEntitiesFromResponse(readings)
  } catch (cause) { error.value = 'api-error'; throw cause }
  finally { loading.value = false }
 }
 function readingsFor(inspection) {
  return telemetry.value.filter(reading => reading.inspectionRecordId != null
   ? String(reading.inspectionRecordId) === String(inspection.id)
   : reading.machineryCode === inspection.machineryCode && String(reading.pitSectionId) === String(inspection.pitSectionId))
 }
 function totalHours(inspection) {
  const readings = readingsFor(inspection)
  if (readings.some(item => !Number.isFinite(item.operatingHours) || item.operatingHours < 0)) return null
  return readings.reduce((sum, item) => sum + item.operatingHours, 0)
 }
 function availableCapacity(inspection) {
  const total = totalHours(inspection)
  return total === null || !Number.isFinite(inspection.maxOperatingHours) ? null : inspection.maxOperatingHours - total
 }
 async function createTelemetry(id, form) {
  if (saving.value) return false
  saving.value = true; error.value = ''
  try {
   await load()
   const inspection = inspections.value.find(item => String(item.id) === String(id))
   if (!inspection) throw new Error('invalid-inspection')
   const capacity = availableCapacity(inspection)
   if (capacity === null) throw new Error('missing-capacity')
   if (!Number.isFinite(form.operatingHours) || form.operatingHours <= 0 || form.operatingHours > capacity) throw new Error('capacity-error')
   if (![form.engineTemperatureC, form.oilPressurePsi, form.vibrationMmS].every(Number.isFinite) || form.oilPressurePsi < 0 || form.vibrationMmS < 0) throw new Error('validation-error')
   const response = await api.telemetry.create(new CreateTelemetryRequest(inspection, form))
   telemetry.value.push(TelemetryAssembler.toEntityFromResource(response.data))
   return true
  } catch (cause) {
   error.value = ['invalid-inspection', 'missing-capacity', 'capacity-error', 'validation-error'].includes(cause.message) ? cause.message : 'api-error'
   throw cause
  } finally { saving.value = false }
 }
 return { inspections, telemetry, loading, saving, error, load, readingsFor, totalHours, availableCapacity, createTelemetry }
})
