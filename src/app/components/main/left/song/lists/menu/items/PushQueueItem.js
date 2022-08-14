import { MenuItem } from '@mui/material';
import { Player } from 'app/Player';
import React from 'react';

export const PushQueueItem = (props) => {

  const handleClick = () => {
    Player.push(props.song);
    props.handleMoreClose();
  }

  return <MenuItem onClick={handleClick}>Add to queue</MenuItem>
}