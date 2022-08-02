import { URLMAIN } from "Consts"

export class AlbumAPI {
  
  static async get(id) {
    return fetch(URLMAIN + "/albums/" + id)
    .then((response)=>{
      return response.json();
    })
    // .then(
      // (result) => {
      //   console.log("Fetched object", result);
      // },
      // (error) => {
      //   console.log("Fetch error",error)
      // }
    // )
  }

}