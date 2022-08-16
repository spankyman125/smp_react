import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { SongAPI } from 'api/SongAPI';

export const Like = (props) => {

  const handleClick = () => {
    SongAPI.like(props.song.id)
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

