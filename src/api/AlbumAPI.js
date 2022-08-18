import { BaseAPI } from "./BaseAPI";
import { json, status, withAuth } from "./Utilities";

export class AlbumAPI extends BaseAPI {
  static path = super.path + "/albums";

  static async get(id) {
    return fetch(this.path + "/" + id, withAuth())
      .then(status)
      .then(json)
  }

  static async like(id) {
    return fetch(this.path + "/" + id + "/like", withAuth({ method: "PUT" }))
      .then(status)
      .then(json)
  }
}