import {json, status} from "./Utilities"
import {BaseAPI} from "./BaseAPI"
export class HomeAPI extends BaseAPI {
  
    static path = super.path + "/home";

    static async get_random_albums(limit) {
        return fetch(this.path + "/random" + "/albums?" + (limit? new URLSearchParams({limit: limit}) : ""))
        .then(status)
        .then(json)
    }

    static async get_random_songs(limit) {
        return fetch(this.path + "/random" + "/songs?" + (limit? new URLSearchParams({limit: limit}) : ""))
        .then(status)
        .then(json)
    }

    static async get_random_artists(limit) {
        return fetch(this.path + "/random" + "/artists?" + (limit? new URLSearchParams({limit: limit}) : ""))
        .then(status)
        .then(json)
    }


}