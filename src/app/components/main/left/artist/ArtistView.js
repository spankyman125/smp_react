import { ArtistAPI } from "api/ArtistAPI";
import { MainSongsContext } from 'app/contexts/MainSongsContext';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArtistSongsList } from "../song/lists/ArtistSongsList";
import { ArtistHeader } from "./ArtistHeader";
import { Tabs } from "../Tabs";
import { AlbumCard } from "../album/AlbumCard";
import { CardsGrid } from "../CardsGrid";

export const ArtistView = ({ tab }) => {
  const [artist, setArtist] = useState(null);
  const { enqueueSnackbar, closeSnack } = useSnackbar();
  const urlParams = useParams();
  const { songs, setSongs } = useContext(MainSongsContext);

  const fetchData = () => {
    ArtistAPI.get(urlParams.artistId)
      .then(
        (result) => {
          enqueueSnackbar("Artist received", { variant: 'info' });
          setArtist(result);
          setSongs(result.songs)
        },
        (error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        })
  }

  useEffect(() => fetchData(), [urlParams.artistId])

  return (
    <>
      <ArtistHeader artist={artist} />
      <Tabs values={["songs", "albums"]} labels={["Songs", "Albums"]} tab={tab}>
        <ArtistSongsTab songs={songs} />
        <ArtistAlbumsTab albums={artist?.albums} />
      </Tabs>
    </>
  )
}

const ArtistSongsTab = ({ songs }) => {
  return <ArtistSongsList songs={songs} />
}

const ArtistAlbumsTab = ({ albums }) => {
  return (
    <CardsGrid sx={{ p: "12px 0px 12px 12px" }}>
      {albums?.map(
        (album) => (<AlbumCard key={album.id} album={album} />)
      )}
    </CardsGrid>
  )
}

