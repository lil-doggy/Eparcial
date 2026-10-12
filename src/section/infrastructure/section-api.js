import { BaseApi } from '../../shared/infrastructure/base-api.js'
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js'
export class SectionApi extends BaseApi {
 constructor() {
  super()
  this.sections = new BaseEndpoint(this, import.meta.env.VITE_SECTIONS_URL)
  this.models = new BaseEndpoint(this, import.meta.env.VITE_MODELS_URL)
 }
}
