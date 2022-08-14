import { List } from "@mui/material";
import { PlayerContext } from "app/contexts/PlayerContext";
import { useContext } from 'react';

export const SongsList = ({songs, Render}) => {
  const {playerContext, setPlayerContext} = useContext(PlayerContext);
  const currentSong = playerContext.queue.songs[playerContext.queue.position] || null;

  return (
    <List>{
      songs.map((song, index) => (
        <Render
          key={song.id}
          songs={songs}
          index={index}
          isSelected={currentSong && currentSong.id === song.id}
          isPlaying={playerContext.isPlaying}
        />
      ))
    }</List>
  )
}