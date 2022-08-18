import '@fontsource/roboto/300.css';
import { ArtistAPI } from "api/ArtistAPI";
import { MainSongsContext } from 'app/contexts/MainSongsContext';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArtistHeader } from "./ArtistHeader";
import { ArtistTabs } from "./ArtistTabs";

export const ArtistView = () => {
  const [artist, setArtist] = useState(null);
  const { enqueueSnackbar, closeSnack } = useSnackbar();
  const urlParams = useParams();
  const navigate = useNavigate();
  const { songs, setSongs } = useContext(MainSongsContext);

  switch (urlParams.tab) {
    case "songs":
    case "albums":
      break;
    default:
      navigate('./songs');
      break;
  }

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
      <ArtistTabs artist={artist} songs={songs}/>
    </>
  )
}

