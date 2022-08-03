import { URLMAIN } from "app/Consts"
import {json, status} from "./Utilities"

export class BaseAPI {
  
  static path = URLMAIN;

  static async get(id) {
    return fetch(this.path + "/" + id)
    .then(status)
    .then(json)
  }

}