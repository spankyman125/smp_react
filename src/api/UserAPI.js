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

  static async get(username) {
    return fetch(this.path + `/${username}`, withAuth())
      .then(status)
      .then(json)
  }

  static async update(name, surname, about, email) {
    return fetch(
      this.path + '/me',
      withAuth({
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          surname: surname,
          about: about,
          email: email,
        })
      })
    )
      .then(status)
      .then(json)
  }

  static async uploadImage(imageFile) {
    const formData = new FormData()
    formData.append("file", imageFile);

    return fetch(
      this.path + '/me/upload-image',
      withAuth({
        method: "POST",
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      })
    )
      .then(status)
      .then(json)
  }

  static async get_songs(username) {
    return fetch(this.path + `/${username}/songs`, withAuth())
      .then(status)
      .then(json)
  }

  static async get_albums(username) {
    return fetch(this.path + `/${username}/albums`, withAuth())
      .then(status)
      .then(json)
  }

  static async get_artists(username) {
    return fetch(this.path + `/${username}/artists`, withAuth())
      .then(status)
      .then(json)
  }

  static async create(username, password) {
    return fetch(
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
  }
}