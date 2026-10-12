export class BaseEndpoint {
 constructor(api, path) { this.http = api.http; this.path = path }
 getAll() { return this.http.get(this.path) }
 create(request) { return this.http.post(this.path, request) }
 patch(id, request) { return this.http.patch(`${this.path}/${encodeURIComponent(id)}`, request) }
}
