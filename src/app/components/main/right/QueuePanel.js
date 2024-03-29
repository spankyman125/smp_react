import CloseIcon from '@mui/icons-material/Close';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { QueueSongsList } from 'app/components/main/left/song/lists/QueueSongsList';
import { PlayerContext } from "app/contexts/PlayerContext";
import React, { useContext, useState } from 'react';
import Slide from '@mui/material/Slide';

export function QueuePanel() {
  const [isOpened, setIsOpened] = useState(false);

  const onOpenClick = (e) => {
    setIsOpened(isOpened ? false : true);
  }

  return (
    <React.Fragment>
      <Slide direction="left" in={isOpened} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: '100%',
            top: "0px",
            position: { md: "sticky", xs: "fixed" },
            backgroundColor: { md: "unset", xs: "background.paper" },
            overflowY: "hidden",
            height: {
              md: "calc(100vh - 86px)",
              xs: "calc(100vh - 69px)"
            }
          }}>
          <QueueSongsList />
        </Box>
      </Slide>
      <IconButton
        onClick={onOpenClick}
        sx={{
          position: "fixed",
          right: "16px",
          bottom: "86px",
          backgroundColor: "background.paper",
        }}
      >
        {isOpened ? <CloseIcon fontSize='large' /> : <QueueMusicIcon fontSize='large' />}
      </IconButton>
    </React.Fragment>
  );
}