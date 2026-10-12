import { PitSection } from '../domain/model/pit-section.entity.js'
export class PitSectionAssembler {
 static toEntityFromResource(resource) { return new PitSection(resource) }
 static toEntitiesFromResponse(response) {
  if (!Array.isArray(response.data)) throw new Error('invalid-response')
  return response.data.map(resource => this.toEntityFromResource(resource))
 }
}
