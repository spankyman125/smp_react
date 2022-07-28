import * as React from 'react';
import  { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SmpAppBar  from "./SmpAppBar";
import SmpBottomAppBar  from "./SmpBottomAppBar";
import useWindowDimensions  from "./ViewPortSizeHook";
import SongViewList  from "./SongViewList";
import { song, song2, song3 } from "./Consts"


const theme = createTheme({
  palette: {
    // mode:"dark",
    primary: {
      main: '#2f524e',
    },
    background: {
      paper: '#e8e8de',
      default: '#e8e8de',
    },
    secondary: {
      main: '#2f524e',
    },
    info: {
      main: '#48808f',
    },
  },
});

export const PlayerContext = React.createContext({
  queue: {position:0, songs:[null]},
  current_song: null,
  isPlaying: false
});

export default function App() {
  const { height, width } = useWindowDimensions();
  const [playerContext, setPlayerContext] = useState({
      queue: {position:0, songs:[song,song2,song3]},
      currentSong: song,
      isPlaying: false
  });
  const PlayerContextValue = { playerContext, setPlayerContext };

  return(
    <React.Fragment>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container maxWidth="false" sx={{padding:"0px 0px 0px 0px", minHeight:"100%", display:"flex", flexDirection:"column", width:{md:"100%"}}} >
          <PlayerContext.Provider value={PlayerContextValue}>
            <SmpAppBar />
            <Grid container sx={{flex:"1 0 auto",borderRight:"1px dashed gray",borderLeft:"1px dashed gray" }}>
              <Grid item xl={8} md={8} xs={12} sx={{paddingLeft:"24px", paddingTop:"24px", paddingBottom: "16px", borderRight:"1px dashed gray"}}>
                <Outlet />
              </Grid>
              <Grid item xl={4} md={4} xs={0}>
                <Box sx={{position:"sticky",top:"80px"}}>
                  <SongViewList height={height-64}/>
                </Box>
              </Grid>
                <SmpBottomAppBar sx={{flex:"0 0 auto"}}/>
            </Grid>
          </PlayerContext.Provider>
        </Container>
      </ThemeProvider>
      </React.StrictMode>
    </React.Fragment>
  )
}
