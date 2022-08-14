import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import { hideOnHover } from './hoc/hoverVisibility';


export const SongTime = hideOnHover((props) => {
  return (
    <Box 
      className={props.className || null}
      sx={props.sx || null}
    >
      <ListItemText secondary={new Date(1000 * props.song.duration).toISOString().substring(14, 19)} />
    </Box>
  )
})
