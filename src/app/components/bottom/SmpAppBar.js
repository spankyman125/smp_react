import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { AudioControl } from "./player/AudioControl";
import PlayerView from "./player/PlayerView";

const pages = ['Products', 'Pricing', 'Blog'];

const SmpAppBar = () => {
  return (
    <React.Fragment>
      <AppBar position="sticky" sx={{bottom:"0px"}}>
        <AudioControl/>
        <Toolbar  sx={{p:"0px 8px 0px 8px"}}>
          <MusicNoteIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexShrink:0
            }}
          >
            SMP
          </Typography>
          <PlayerView/>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
export default SmpAppBar;
