import { json, status } from "./Utilities"
import { BaseAPI } from "./BaseAPI"
export class HomeAPI extends BaseAPI {
  static path = super.path + "/home";

  static async get_random_albums(limit = 10) {
    return fetch(
      this.path + "/random" + "/albums?" + new URLSearchParams({ limit: limit }))
      .then(status)
      .then(json)
  }

  static async get_random_songs(limit = 10) {
    return fetch(this.path + "/random" + "/songs?" + new URLSearchParams({ limit: limit }))
      .then(status)
      .then(json)
  }

  static async get_random_artists(limit = 10) {
    return fetch(this.path + "/random" + "/artists?" + new URLSearchParams({ limit: limit }))
      .then(status)
      .then(json)
  }
}