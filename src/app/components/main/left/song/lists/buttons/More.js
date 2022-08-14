import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import {showOnHover, hideOnHover} from './hoc/hoverVisibility'


export const More = showOnHover((props) => {
  return (
    <React.Fragment>
      <IconButton 
        onClick={props.onClick}
        className={props.className || null}
        sx={props.sx || null}
      >
        <MoreHorizIcon/>
      </IconButton>
    </React.Fragment>
  )
})
