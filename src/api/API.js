import { AuthAPI   } from "./AuthAPI"
import { ArtistAPI } from "./ArtistAPI"
import { SongAPI   } from "./SongAPI"
import { AlbumAPI  } from "./AlbumAPI"
import { UserAPI   } from "./UserAPI"
import { SearchAPI } from "./SearchAPI"
import { TagAPI    } from "./TagAPI"
import { HomeAPI   } from "./HomeAPI"

export class API {
  static auth = AuthAPI;
  static artists = ArtistAPI;
  static songs = SongAPI;
  static albums = AlbumAPI;
  static users = UserAPI;
  static search = SearchAPI;
  static tags = TagAPI;
  static home = HomeAPI;
}