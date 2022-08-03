import { URLMAIN } from "Consts"
import {json, status} from "./Utilities"
import {BaseAPI} from "./BaseAPI"

export class AlbumAPI extends BaseAPI {
  
  static path = super.path + "/albums";

}