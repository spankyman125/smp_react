import IconButton from '@mui/material/IconButton';
import { Player } from 'app/Player';
import DeleteIcon from '@mui/icons-material/Delete';
import {showOnHover, hideOnHover} from './hoc/hoverVisibility'

export const RemoveQueue = showOnHover((props) => {

  const handleClick = () => {
    console.log(props.index)
    Player.remove(props.index);
  }

  return (
    <IconButton 
      onClick={handleClick}
      className={props.className || null}
      sx={props.sx || null}
    >
      <DeleteIcon/>
    </IconButton>
  )
})

