import IconButton from '@mui/material/IconButton';
import { Player } from 'app/Player';
import AddIcon from '@mui/icons-material/Add';
import {showOnHover, hideOnHover} from './hoc/hoverVisibility'

export const PushQueue = showOnHover((props) => {

  const handleClick = () => {
    Player.push(props.song);
  }

  return (
    <IconButton 
      onClick={handleClick}
      className={props.className || null}
      sx={props.sx || null}
    >
      <AddIcon/>
    </IconButton>
  )
})

