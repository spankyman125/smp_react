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
import SongsViewList  from "./SongsViewList";
import { song, song2, song3,song4, theme } from "./Consts"
import { PlayerContext } from "./PlayerContext" 
import { PlayerInit } from "./Player" 
import { AudioControl } from "./AudioControl" 
import Stack from '@mui/material/Stack';
import { URLMAIN } from "./Consts" 

export function App() {
  const { height, width } = useWindowDimensions();
  const [playerContext, setPlayerContext] = useState({
      queue: {position:0, songs:[song,song2,song3,song4]},
      isPlaying: false
  });
  const PlayerContextValue = { playerContext, setPlayerContext };
  console.log("App context",PlayerContextValue)
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Stack sx={{ height:"100vh", p: {md:"0px 24px 0px 24px", xs:"0px 0px 0px 0px"} }} >
        <PlayerContext.Provider value={ PlayerContextValue }>
          {/* <PlayerInit/> */}
          {/* <AudioControl/> */}
          <SmpAppBar />
          <Grid container sx={{ borderRight:"1px dashed gray", borderLeft:"1px dashed gray", flex:"1 0 auto" }}>
            <Grid item xl={8} md={8} xs={12} sx={{ p:"24px 0px 0px 2vw", borderRight:"1px dashed gray" }}>
              <Outlet />
            </Grid>
            <Grid item xl={4} md={4} xs={0}>
              <Box sx={{ position:"sticky", top:"80px" }}>
                {/* <SongsViewList height={ height-64 }/> */}
              </Box>
            </Grid>
          </Grid>
          <SmpBottomAppBar/>
        </PlayerContext.Provider>
      </Stack>
    </ThemeProvider>
  )
}
