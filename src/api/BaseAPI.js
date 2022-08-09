import { URLMAIN_API } from "app/Consts"
import {json, status} from "./Utilities"

export class BaseAPI {
  
  static path = URLMAIN_API;

  static async get(id) {
    return fetch(this.path + "/" + id)
    .then(status)
    .then(json)
  }

}