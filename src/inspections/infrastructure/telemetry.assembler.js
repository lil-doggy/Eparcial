import { Telemetry } from '../domain/model/telemetry.entity.js'
export class TelemetryAssembler {
 static toEntityFromResource(resource) { return new Telemetry(resource) }
 static toEntitiesFromResponse(response) {
  if (!Array.isArray(response.data)) throw new Error('invalid-response')
  return response.data.map(resource => this.toEntityFromResource(resource))
 }
}
