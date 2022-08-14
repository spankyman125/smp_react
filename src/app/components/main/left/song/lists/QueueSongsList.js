import { SongListItem } from "app/components/main/left/song/SongListItem";
import { PlayerContext } from "app/contexts/PlayerContext";
import { Player } from 'app/Player';
import React, { memo, useContext } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Like } from './buttons/Like';
import { More } from './buttons/More';
import { SongTime } from './buttons/SongTime';
import { RemoveQueue } from './buttons/RemoveQueue';
import { RemoveQueueItem } from './menu/items/RemoveQueueItem';
import { MoreMenu } from './menu/MoreMenu';

export const QueueSongsList = ({songs}) => {
  const {playerContext, setPlayerContext} = useContext(PlayerContext);
  const currentSong = playerContext.queue.songs[playerContext.queue.position] || null;

  return (
    <Virtuoso
      data={songs}
      overscan={50}
      itemContent={(index, song) => 
        <QueueSongListItem
          song={song}
          index={index}
          isSelected={currentSong && (currentSong.id === song.id && index === playerContext.queue.position )}
          isPlaying={playerContext.isPlaying}
        />
      }
    />
  )
}

const QueueSongListItem = memo(({song, index, ...other}) => {
  const [anchor, setAnchor] = React.useState(null);
  
  const handleMoreClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchor(null);
  };

  const handleSongClick = () => {
    Player.switchTo(index); 
  }

  return (
    <>  
      <SongListItem song={song} index={index} {...other} onSongClick={handleSongClick} >
        <RemoveQueue handleMoreClose={handleMoreClose} index={index}/>      
        <Like song={song}/>
        <More onClick={handleMoreClick}/>
        <SongTime song={song}/>
      </SongListItem>
      <MoreMenu anchor={anchor} handleMoreClose={handleMoreClose}>
        <RemoveQueueItem index={index} handleMoreClose={handleMoreClose}/>
      </MoreMenu>
    </>
  )
})