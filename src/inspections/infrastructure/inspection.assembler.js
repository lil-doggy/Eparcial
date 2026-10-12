import { Inspection } from '../domain/model/inspection.entity.js'
export class InspectionAssembler {
 static toEntityFromResource(resource) { return new Inspection(resource) }
 static toEntitiesFromResponse(response) {
  if (!Array.isArray(response.data)) throw new Error('invalid-response')
  return response.data.map(resource => this.toEntityFromResource(resource))
 }
}
