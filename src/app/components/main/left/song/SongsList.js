import { List } from "@mui/material";
import { PlayerContext } from "app/contexts/PlayerContext";
import { useContext, useRef } from 'react';
import ViewportList from 'react-viewport-list';


export const SongsList = ({ songs, Render }) => {
  const ref = useRef(null);
  const { playerContext, setPlayerContext } = useContext(PlayerContext);
  const currentSong = playerContext.queue.songs[playerContext.queue.position] || null;

  return (
    <List  ref={ref}>
      <ViewportList viewportRef={ref} items={songs} itemMinSize={40} margin={0} overscan={5}>
        {(song, index) => (
          <Render
            key={song.id}
            songs={songs}
            index={index}
            isSelected={currentSong && currentSong.id === song.id}
            isPlaying={playerContext.isPlaying && currentSong && (currentSong.id === song.id)}
          />
        )}
      </ViewportList>
    </List>
  );
};