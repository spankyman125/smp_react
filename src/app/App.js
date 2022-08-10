import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';
import { API } from "api/API";
import { SnackbarProvider } from 'notistack';
import { useState } from "react";
import SmpAppBar from "./components/bottom/BottomBar";
import { Main } from "./components/main/Main";
import TopBar from "./components/top/TopBar";
import { theme } from "./Consts";
import { PlayerContext } from "./contexts/PlayerContext";
import { Player } from './Player';

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
            <Main/>
            <SmpAppBar />
          </PlayerContext.Provider>
        </Stack>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
