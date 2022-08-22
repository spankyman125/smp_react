import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { SongAPI } from 'api/SongAPI';
import { PlayerContext } from 'app/contexts/PlayerContext';
import { MainSongsContext } from 'app/contexts/MainSongsContext';
import { Player } from 'app/Player';
import { useContext } from 'react';

export const Like = (props) => {
  const { songs, setSongs } = useContext(MainSongsContext);
  const { playerContext, setPlayerContext } = useContext(PlayerContext);

  const handleClick = () => {
    setSongs(
      songs.map((song) =>
        song.id === props.song.id ?
          { ...song, liked: !song.liked } : song
      )
    )
    const queueClone = { ...playerContext.queue }
    queueClone.songs = playerContext.queue.songs.map(
      (song) => song.id === props.song.id ?
        { ...song, liked: !song.liked } : song
    )
    SongAPI.like(props.song.id);
    props.song.liked = !props.song.liked; // :(
    Player.replace(queueClone)
  }

  return (
    <IconButton
      onClick={handleClick}
      className={props.className || null}
      sx={props.sx || null}
    >
      {props.song.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  )
}

