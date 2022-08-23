import { List } from "@mui/material";
import { PlaylistAPI } from "api/PlaylistAPI";
import { PlayerContext } from "app/contexts/PlayerContext";
import { useContext, useEffect, useRef, useState } from 'react';
import ViewportList from 'react-viewport-list';


export const SongsList = ({ songs, Render }) => {
  const ref = useRef(null);
  const { playerContext, setPlayerContext } = useContext(PlayerContext);
  const currentSong = playerContext.queue.songs[playerContext.queue.position] || null;
  const [userPlaylists, setUserPlaylists] = useState(null);
  const fetchPlaylists = () => {
    PlaylistAPI.get_all("me")
      .then((playlists) => setUserPlaylists(playlists))
  }
  useEffect(() => fetchPlaylists(), []);

  return (
    <List ref={ref}>
      <ViewportList viewportRef={ref} items={songs} itemMinSize={40} margin={0} overscan={5}>
        {(song, index) => (
          <Render
            key={song.id}
            songs={songs}
            index={index}
            isSelected={currentSong && currentSong.id === song.id}
            isPlaying={playerContext.isPlaying && currentSong && (currentSong.id === song.id)}
            playlists={userPlaylists}
          />
        )}
      </ViewportList>
    </List>
  );
};