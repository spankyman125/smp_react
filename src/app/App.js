import React from 'react';
import { Box, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

import Stack from '@mui/material/Stack';
import { song, song2, song3, song4, theme } from "./Consts";
import { PlayerContext } from "./contexts/PlayerContext";
import SmpAppBar from "./components/top/SmpAppBar";
import SmpBottomAppBar from "./components/bottom/SmpBottomAppBar";
import useWindowDimensions from "./hooks/ViewPortSizeHook";
import { API } from "api/API"

export function App() {
  window.api = API; //Temp
  const { height, width } = useWindowDimensions();
  const [playerContext, setPlayerContext] = useState({
      queue: {position:0, songs:[]},
      isPlaying: false
  });
  const PlayerContextValue = { playerContext, setPlayerContext };
  console.log("App context",PlayerContextValue)
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <SnackbarProvider 
        maxSnack={3}
        autoHideDuration={1500}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Stack sx={{ minHeight:"100vh", p: {md:"0px 24px 0px 24px", xs:"0px 0px 0px 0px"} }} >
          <PlayerContext.Provider value={ PlayerContextValue }>
          <SmpBottomAppBar/>
            <Grid container sx={{ borderRight:"1px dashed gray", borderLeft:"1px dashed gray", flex:"1 0 auto" }}>
              <Grid item xl={8} md={8} xs={12} sx={{ p:"24px 0px 0px 2vw", borderRight:"1px dashed gray" }}>
                <Outlet />
              </Grid>
              <Grid item xl={4} md={4} xs={0}>
                <Box sx={{ position:"sticky", top:"80px" }}>
                  {/* <RightPanel height={ height-64 }/> */}
                </Box>
              </Grid>
            </Grid>
            <SmpAppBar />
          </PlayerContext.Provider>
        </Stack>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
