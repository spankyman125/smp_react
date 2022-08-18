import '@fontsource/roboto/300.css';
import Box from '@mui/material/Box';
import { AlbumAPI } from "api/AlbumAPI";
import { MainSongsContext } from 'app/contexts/MainSongsContext';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumSongsList } from "../song/lists/AlbumSongsList";
import { AlbumHeader } from "./AlbumHeader";

export const AlbumView = () => {

  const [album, setAlbum] = useState(null);
  const { enqueueSnackbar, closeSnack } = useSnackbar();
  const urlParams = useParams();
  const { songs, setSongs } = useContext(MainSongsContext);

  const fetchData = () => {
    AlbumAPI.get(urlParams.albumId)
      .then(
        (result) => {
          enqueueSnackbar("Album received", { variant: 'info' });
          setAlbum(result);
          setSongs(result.songs)
        },
        (error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        }
      )
  }

  useEffect(() => fetchData(), [urlParams.albumId])

  return (
    <Box>
      <AlbumHeader album={album} />
      <AlbumSongsList songs={songs} />
    </Box>
  )
}

