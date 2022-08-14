import { MenuItem } from '@mui/material';
import { SongListItem } from "app/components/main/left/song/SongListItem";
import { Player } from 'app/Player';
import React, { memo, useCallback, useMemo } from 'react';
import { Like } from './buttons/Like';
import { More } from './buttons/More';
import { MoreMenu } from './menu/MoreMenu';
import { SongsList } from '../SongsList';
import { SongTime } from './buttons/SongTime';
import { PushQueue } from './buttons/PushQueue';
import { PushQueueItem } from './menu/items/PushQueueItem';

export const AlbumSongsList = memo(({songs}) => {
  return <SongsList songs={songs} Render={AlbumSongListItem} />
})

const AlbumSongListItem = memo(({songs, index, ...other}) => {
  const [anchor, setAnchor] = React.useState(null);
  const song = songs[index] || null;
  
  const handleMoreClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchor(null);
  };

  const handleSongClick = useCallback(() => {
    Player.replace(
      {
        songs:songs,
        position:index,
      }
    ); 
  },[])

  return (
    <>  
      <SongListItem song={song} index={index} {...other} onSongClick={handleSongClick} >
        <PushQueue song={song}/>
        <Like song={song}/>
        <More onClick={handleMoreClick}/>
        <SongTime song={song}/>
      </SongListItem>
      <MoreMenu anchor={anchor} handleMoreClose={handleMoreClose}>
        <PushQueueItem handleMoreClose={handleMoreClose} song={song}/>
      </MoreMenu>
    </>
  )
})