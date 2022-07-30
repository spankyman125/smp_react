import * as React from 'react';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import SmpAppBar  from "./SmpAppBar";
import SmpBottomAppBar  from "./SmpBottomAppBar";
import useWindowDimensions  from "./ViewPortSizeHook";
import SongViewList  from "./SongViewList";
import { song, song2, song3, theme } from "./Consts"
import { PlayerContext } from "./PlayerContext" 


export function App() {
  const { height, width } = useWindowDimensions();
  const [playerContext, setPlayerContext] = useState({
      queue: {position:0, songs:[song,song2,song3]},
      currentSong: song,
      isPlaying: false
  });
  const PlayerContextValue = { playerContext, setPlayerContext };

  return(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container maxWidth="false" sx={{ height:"100vh" }} >
        <PlayerContext.Provider value={ PlayerContextValue }>
          <SmpAppBar />
          <Grid container sx={{ borderRight:"1px dashed gray", borderLeft:"1px dashed gray" }}>
            <Grid item xl={8} md={8} xs={12} sx={{ p:"24px 0px 0px 24px", borderRight:"1px dashed gray" }}>
              <Outlet />
            </Grid>
            <Grid item xl={4} md={4} xs={0}>
              <Box sx={{ position:"sticky", top:"80px" }}>
                <SongViewList height={ height-64 }/>
              </Box>
            </Grid>
          </Grid>
          <SmpBottomAppBar/>
        </PlayerContext.Provider>
      </Container>
    </ThemeProvider>
  )
}
