import { BaseApi } from '../../shared/infrastructure/base-api.js'
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js'
export class InspectionsApi extends BaseApi {
 constructor() {
  super()
  this.inspections = new BaseEndpoint(this, import.meta.env.VITE_INSPECTIONS_PATH)
  this.telemetry = new BaseEndpoint(this, import.meta.env.VITE_TELEMETRY_PATH)
 }
}
