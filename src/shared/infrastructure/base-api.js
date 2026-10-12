import axios from 'axios'
export class BaseApi {
 constructor(baseURL = import.meta.env.VITE_API_URL) { this.http = axios.create({ baseURL, timeout: 15000 }) }
}
