import { BaseAPI } from "./BaseAPI"
import { AuthAPI } from "./AuthAPI"
import { json, status, withAuth } from "./Utilities"

export class UserAPI extends BaseAPI {

  static path = super.path + "/users";

  static async me() {
    return fetch(this.path + "/me", withAuth())
      .then(status)
      .then(json)
  }

  static async create(username, password, successCallback = () => void 0, errorCallback = () => void 0) {
    fetch(
      this.path,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }
    )
      .then(status)
      .then(json)
      .then(successCallback)
      .catch(errorCallback)
  }

}