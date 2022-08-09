import CloseIcon from '@mui/icons-material/Close';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import SongsList from 'app/components/main/song/SongsList';
import { PlayerContext } from "app/contexts/PlayerContext";
import React, { useContext, useState } from 'react';

export function QueuePanel(props) {
  const {playerContext, setPlayerContext} = useContext(PlayerContext);
  const [isOpened, setIsOpened] = useState(true);

  const onOpenClick = () => {
    setIsOpened(true);
  }

  const onCloseClick = () => {
    setIsOpened(false);
  }

  return (
    <React.Fragment>
      <Box 
        sx= {{ 
          width: '100%', 
          top:"0px",
          position: {md:"sticky", xs:"fixed"},
          display: (isOpened? "":"none"), 
          backgroundColor: {md:"unset", xs:"background.paper"},
          overflowY:"scroll",
          height:{
            md:"calc(100vh - 86px)",
            xs:"calc(100vh - 69px)"
          }
      }}>
          <Box sx={{display:"flex",justifyContent:"space-between"}}>
            <Typography variant='h4' component="span">Queue</Typography>
            <IconButton onClick={onCloseClick} sx={{display:(isOpened? "block" : "none")}}>
              <CloseIcon fontSize='large'/>
            </IconButton>
          </Box>
          <SongsList songs={playerContext.queue.songs}/>
      </Box>
      <IconButton 
        onClick={onOpenClick} 
        sx={{
          position:"fixed",
          right:"16px",
          bottom:"86px",
          backgroundColor: "background.paper",
          display:(isOpened? "none" : "block")
        }}>
        <QueueMusicIcon fontSize='large'/>
      </IconButton>
    </React.Fragment>
  );
}