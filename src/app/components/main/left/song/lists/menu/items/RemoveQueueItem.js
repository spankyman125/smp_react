import { MenuItem } from '@mui/material';
import { Player } from 'app/Player';

export const RemoveQueueItem = (props) => {

  const handleClick = () => {
    Player.remove(props.index);
    props.handleMoreClose();
  }

  return <MenuItem onClick={handleClick}>Remove from queue</MenuItem>
}

