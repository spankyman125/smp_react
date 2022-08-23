import { BaseAPI } from "./BaseAPI"
import { json, status, withAuth } from "./Utilities"

export class PlaylistAPI extends BaseAPI {
  static path = super.path + "/users";

  static async get_all(username) {
    return fetch(this.path + `/${username}/playlists`, withAuth())
      .then(status)
      .then(json)
  }

  static async get(username, id) {
    return fetch(this.path + `/${username}/playlists` + `/${id}`, withAuth())
      .then(status)
      .then(json)
  }

  static async create(name) {
    return fetch(
      this.path + '/me/playlists?' + new URLSearchParams({ name: name }),
      withAuth({
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }))
      .then(status)
      .then(json)
  }

  static async delete(id) {
    return fetch(
      this.path + `/me/playlists/${id}`,
      withAuth({
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }))
      .then(status)
      .then(json)
  }

  static async addSong(id, song) {
    return fetch(
      this.path + `/me/playlists/${id}/add?` + new URLSearchParams({ song_id: song.id }),
      withAuth({
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    )
      .then(status)
      .then(json)
  }

  static async removeSong(id, position) {
    return fetch(
      this.path + `/me/playlists/${id}/delete?` + new URLSearchParams({ position: position }),
      withAuth({
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    )
      .then(status)
      .then(json)
  }

  static async uploadImage(id, imageFile) {
    const formData = new FormData()
    formData.append("file", imageFile);

    return fetch(
      this.path + `/me/playlists/${id}/upload-image`,
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
}