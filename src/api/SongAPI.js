import { BaseAPI } from "./BaseAPI";
import { json, retryAfterRefresh, status, withAuth } from "./Utilities";

export class SongAPI extends BaseAPI {
  static path = super.path + "/songs";

  static get = retryAfterRefresh(
    async (id) => {
      return fetch(this.path + "/" + id, withAuth())
        .then(status)
        .then(json)
    }
  )

  static async like(id) {
    return fetch(this.path + "/" + id + "/like", withAuth({ method: "PUT" }))
      .then(status)
      .then(json)
  }
}