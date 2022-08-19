import { SongListItem } from "app/components/main/left/song/SongListItem";
import { Player } from 'app/Player';
import React, { memo, useCallback, useMemo } from 'react';
import { SongsList } from '../SongsList';
import { Like } from './buttons/Like';
import { More } from './buttons/More';
import { PushQueue } from './buttons/PushQueue';
import { SongTime } from './buttons/SongTime';
import { PushQueueItem } from './menu/items/PushQueueItem';
import { MoreMenu } from './menu/MoreMenu';

export const ArtistSongsList = memo(({ songs }) => {
  return <SongsList songs={songs} Render={ArtistSongListItem} />
})

const ArtistSongListItem = memo(({ songs, index, ...other }) => {
  const [anchor, setAnchor] = React.useState(null);
  const song = songs[index] || null;

  const handleMoreClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchor(null);
  };

  const handleSongClick = useCallback(() => {
    Player.replace({
      songs: songs,
      position: index,
    });
  }, [songs, index])

  const MemoizedButtons = useMemo(
    () => [
      <PushQueue song={song} />,
      <Like song={song} />,
      <More onClick={handleMoreClick} />,
      <SongTime song={song} />,
    ],
    [song]
  )

  return (
    <>
      <SongListItem song={song} index={index} {...other} onSongClick={handleSongClick} >
        {MemoizedButtons}
      </SongListItem>
      <MoreMenu anchor={anchor} handleMoreClose={handleMoreClose}>
        <PushQueueItem handleMoreClose={handleMoreClose} song={song} />
      </MoreMenu>
    </>
  )
})