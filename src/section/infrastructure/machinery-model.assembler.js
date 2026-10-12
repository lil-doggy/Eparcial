import { MachineryModel } from '../domain/model/machinery-model.entity.js'
export class MachineryModelAssembler {
 static toEntityFromResource(resource) { return new MachineryModel(resource) }
 static toEntitiesFromResponse(response) {
  if (!Array.isArray(response.data)) throw new Error('invalid-response')
  return response.data.map(resource => this.toEntityFromResource(resource))
 }
}
