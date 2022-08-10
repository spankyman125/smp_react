import { Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';
import { API } from "api/API";
import { SnackbarProvider } from 'notistack';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Player } from './components/bottom/player/Player';
import SmpAppBar from "./components/bottom/SmpAppBar";
import { QueuePanel } from "./components/right/QueuePanel";
import TopBar from "./components/top/SmpBottomAppBar";
import { theme } from "./Consts";
import { PlayerContext } from "./contexts/PlayerContext";

export function App() {
  
  const [playerContext, setPlayerContext] = useState({
    queue: {position:0, songs:[]},
    isPlaying: false
  });
  window.api = API; //For debug purposes
  window.player = Player;
  Player.playerContext = playerContext;
  Player.setPlayerContext = setPlayerContext;
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
          <TopBar/>
            <Grid container sx={{  flex:"1 0 auto" }}>
              <Grid item md={8} xs={12}>
                <Outlet />
              </Grid>
              <Grid item md={4} xs={0} zeroMinWidth
                sx={{
                  top: "0px",
                  maxWidth: {xs:"100vw"},
                  width: {xs:"100vw"},
                }}
              >
                <QueuePanel/>
              </Grid>
            </Grid>
            <SmpAppBar />
          </PlayerContext.Provider>
        </Stack>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
