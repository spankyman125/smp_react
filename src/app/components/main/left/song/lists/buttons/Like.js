import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';


export const Like = (props) => {

  const handleClick = () => {
    console.log("Like song with id", props.song.id);
  }

  return (
    <IconButton 
      onClick={handleClick}
      className={props.className || null}
      sx={props.sx || null}
    >
      <FavoriteBorderIcon/>
    </IconButton>
  )
}

