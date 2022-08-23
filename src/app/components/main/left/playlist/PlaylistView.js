import '@fontsource/roboto/300.css';
import Box from '@mui/material/Box';
import { MainSongsContext } from 'app/contexts/MainSongsContext';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlaylistAPI } from 'api/PlaylistAPI';
import { PlaylistSongsList } from "../song/lists/PlaylistSongsList";
import { PlaylistHeader } from "./PlaylistHeader";

export const PlaylistView = () => {

  const [playlist, setPlaylist] = useState(null);
  const { enqueueSnackbar, closeSnack } = useSnackbar();
  const urlParams = useParams();
  const { songs, setSongs } = useContext(MainSongsContext);

  const fetchData = () => {
    PlaylistAPI.get("me",urlParams.playlistId)
      .then(
        (playlist) => {
          enqueueSnackbar("Playlist received", { variant: 'info' });
          setPlaylist(playlist);
          setSongs(playlist.songs)
        },
        (error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        }
      )
  }

  useEffect(() => fetchData(), [urlParams.playlistId])

  return (
    <Box>
      <PlaylistHeader playlist={playlist} />
      <PlaylistSongsList songs={songs} />
    </Box>
  )
}

