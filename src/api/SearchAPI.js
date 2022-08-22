import { json, status, withAuth } from "./Utilities"
import { BaseAPI } from "./BaseAPI"


export class SearchAPI extends BaseAPI {
  static path = super.path + "/search";

  /* 
  searchParams: {
    name: string, 
    durationFrom: int, 
    durationTo: int, 
    tags: Array<int>, limit: int
  }*/
  static async searchSongs(controller, searchParams) {
    return fetch(
      this.path + "/songs?" + new URLSearchParams(searchParams),
      withAuth({ signal: controller?.signal })
    )
      .then(status)
      .then(json)
  }

  /*
  searchParams: {
    name: string, 
    limit: int
  }*/
  static async searchArtists(controller, searchParams) {
    return fetch(
      this.path + "/artists?" + new URLSearchParams(searchParams),
      withAuth({ signal: controller?.signal })
    )
      .then(status)
      .then(json)
  }

  /*
  searchParams: {
    name: string, 
    release_date_from: string ("yyyy-mm-dd"), 
    release_date_from: string ("yyyy-mm-dd"), 
    limit: int
  }*/
  static async searchAlbums(controller, searchParams) {
    return fetch(
      this.path + "/albums?" + new URLSearchParams(searchParams),
      withAuth({ signal: controller?.signal })
    )
      .then(status)
      .then(json)
  }
}