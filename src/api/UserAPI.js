import { BaseAPI } from "./BaseAPI"
import { json, status, withAuth } from "./Utilities"

export class UserAPI extends BaseAPI {

  static path = super.path + "/users";

  static async me() {
    return fetch(this.path + "/me", withAuth())
      .then(status)
      .then(json)
  }

}