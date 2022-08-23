import { UserAPI } from "api/UserAPI";
import { MainSongsContext } from 'app/contexts/MainSongsContext';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArtistSongsList } from "../song/lists/ArtistSongsList";
import { UserHeader } from "./UserHeader";
import { Tabs } from "../Tabs";
import { AlbumCard } from "../album/AlbumCard";
import { CardsGrid } from "../CardsGrid";
import { ArtistCard } from "../artist/ArtistCard";
import { CreatePlaylistCard, PlaylistCard } from "../playlist/PlaylistCard";
import { useNavigate } from 'react-router-dom';
import { PlaylistAPI } from "api/PlaylistAPI";

export const UserView = ({ tab }) => {
  const [user, setUser] = useState(null);
  const { enqueueSnackbar, closeSnack } = useSnackbar();
  const urlParams = useParams();
  const navigate = useNavigate();

  const userIsOwner = urlParams.username === "me";

  const fetchData = () => {
    UserAPI.get(urlParams.username)
      .then(
        (result) => {
          enqueueSnackbar("User received", { variant: 'info' });
          setUser(result);
        },
        (error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
          navigate('/home');
        })
  }

  useEffect(() => fetchData(), [urlParams.artistId])

  return (
    <>
      <UserHeader user={user} editable={userIsOwner} />
      {user &&
        <Tabs values={["songs", "albums", "artists", "playlists"]} labels={["Songs", "Albums", "Artists", "Playlists"]} tab={tab}>
          <UserSongsTab user={user} />
          <UserAlbumsTab user={user} />
          <UserArtistsTab user={user} />
          {userIsOwner && <UserPlaylistsTab user={user} />}
        </Tabs>
      }
    </>
  )
}

const UserSongsTab = ({ user }) => {
  const { songs, setSongs } = useContext(MainSongsContext);
  const { enqueueSnackbar, closeSnack } = useSnackbar();

  const fetchData = () => {
    UserAPI.get_songs(user.username)
      .then(
        (result) => {
          enqueueSnackbar("User songs received", { variant: 'info' });
          setSongs(result)
        },
        (error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        })
  }
  useEffect(() => fetchData(), [user])

  return <ArtistSongsList songs={songs} />
}

const UserAlbumsTab = ({ user }) => {
  const [albums, setAlbums] = useState(null);
  const { enqueueSnackbar, closeSnack } = useSnackbar();

  const fetchData = () => {
    UserAPI.get_albums(user.username)
      .then(
        (result) => {
          enqueueSnackbar("User albums received", { variant: 'info' });
          setAlbums(result)
        },
        (error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        })
  }

  useEffect(() => fetchData(), [user])

  return (
    <CardsGrid sx={{ p: "12px 0px 12px 12px" }}>
      {albums?.map(
        (album) => (<AlbumCard key={album.id} album={album} />)
      )}
    </CardsGrid>
  )
}

const UserArtistsTab = ({ user }) => {
  const [artists, setArtists] = useState(null);
  const { enqueueSnackbar, closeSnack } = useSnackbar();

  const fetchData = () => {
    UserAPI.get_artists(user.username)
      .then(
        (result) => {
          enqueueSnackbar("User artists received", { variant: 'info' });
          setArtists(result)
        },
        (error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        })
  }

  useEffect(() => fetchData(), [user])

  return (
    <CardsGrid sx={{ p: "12px 0px 12px 12px" }}>
      {artists?.map(
        (artist) => (<ArtistCard key={artist.id} artist={artist} />)
      )}
    </CardsGrid>
  )
}

const UserPlaylistsTab = ({ user }) => {
  const playlistsReducer = (playlists, action) => {
    switch (action.type) {
      case "replace":
        return action.playlists
      case "create":
        return [...playlists, action.playlist]
      case "delete":
        return playlists.filter((playlist) => playlist.id !== action.playlist.id)
      default:
        return new Error("Wrong action specified");
    }
  }

  const [playlists, playlistsDispatch] = useReducer(playlistsReducer, null);
  const { enqueueSnackbar, closeSnack } = useSnackbar();

  const deletePlaylist = (playlist) => {
    PlaylistAPI.delete(playlist.id)
      .then(() => playlistsDispatch({ type: 'delete', playlist: playlist }))
  }

  const createPlaylist = (name) => {
    PlaylistAPI.create(name)
      .then((playlist) => playlistsDispatch({ type: 'create', playlist: playlist }))
  }

  const fetchData = () => {
    PlaylistAPI.get_all("me")
      .then(
        (playlists) => {
          enqueueSnackbar("User playlists received", { variant: 'info' });
          playlistsDispatch({ type: "replace", playlists: playlists })
        },
        (error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        })
  }

  useEffect(() => fetchData(), [user])
  return (
    <CardsGrid sx={{ p: "12px 0px 12px 12px" }}>
      <CreatePlaylistCard createPlaylist={createPlaylist} />
      {playlists?.map(
        (playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            deletePlaylist={() => deletePlaylist(playlist)}
          />
        )
      )}
    </CardsGrid>
  )
}