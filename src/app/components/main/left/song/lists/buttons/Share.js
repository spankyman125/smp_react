import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from 'react';
import {showOnHover, hideOnHover} from './hoc/hoverVisibility'
import ShareIcon from '@mui/icons-material/Share';

export const Share = showOnHover((props) => {
  
  const handleClick = () => {
    console.log("Sharing", props.song.id);
  }
  
  return (
    <React.Fragment>
      <IconButton 
        onClick={props.onClick}
        className={props.className || null}
        sx={props.sx || null}
      >
        <ShareIcon/>
      </IconButton>
    </React.Fragment>
  )
})
