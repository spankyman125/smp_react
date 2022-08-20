import { UserAPI } from "api/UserAPI";
import { MainSongsContext } from 'app/contexts/MainSongsContext';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArtistSongsList } from "../song/lists/ArtistSongsList";
import { UserHeader } from "./UserHeader";
import { Tabs } from "../Tabs";
import { AlbumCard } from "../album/AlbumCard";
import { CardsGrid } from "../CardsGrid";
import { ArtistCard } from "../artist/ArtistCard";
import { useNavigate } from 'react-router-dom';

export const UserView = ({ tab }) => {
  const [user, setUser] = useState(null);
  const { enqueueSnackbar, closeSnack } = useSnackbar();
  const urlParams = useParams();
  const navigate = useNavigate();

  const editable = urlParams.username === "me";

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
      <UserHeader user={user} editable={editable} />
      {user &&
        <Tabs values={["songs", "albums", "artists"]} labels={["Songs", "Albums", "Artists"]} tab={tab}>
          <UserSongsTab user={user} />
          <UserAlbumsTab user={user} />
          <UserArtistsTab user={user} />
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

