import { MenuItem } from '@mui/material';
import { Player } from 'app/Player';
import React, { useEffect } from 'react';
import { PlaylistAPI } from 'api/PlaylistAPI';
import { MoreMenu } from '../MoreMenu'


export const PushPlaylistItem = ({song , playlists}) => {
  const [anchor, setAnchor] = React.useState(null);

  const handleAddClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handlePlaylistAddClick = (playlist) => {
    PlaylistAPI.addSong(playlist.id, song)
    setAnchor(null);
  };

  const handleMoreClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <MenuItem onClick={handleAddClick}>Add to playlist</MenuItem>
      <MoreMenu anchor={anchor} handleMoreClose={handleMoreClose}>
        {playlists.map(
          (playlist) => <MenuItem onClick={() => handlePlaylistAddClick(playlist)}>{playlist.name}</MenuItem>)
        }
      </MoreMenu>
    </>
  )
}