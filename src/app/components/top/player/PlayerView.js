import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { IconButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import React, { useContext } from "react";

import { URLMAIN } from "../../../Consts";
import { Player } from "./Player";
import { PlayerContext } from "../../../contexts/PlayerContext";

//TODO: Handle no queue state
export default function PlayerView(props) {

  const {playerContext, setPlayerContext} = useContext(PlayerContext);
  let queueIsEmpty = (playerContext.queue.songs.length===0)? true : false
  
  let position = null;
  let currentSong = null;

  if(!queueIsEmpty) {
    position = playerContext.queue.position;
    currentSong = playerContext.queue.songs[position]
  }
  // let audio = playerContext.audio;

  function next () {
    Player.next(playerContext, setPlayerContext);
  }
  

  const prev = () => {
    Player.prev(playerContext, setPlayerContext);
  }

  const togglePlay = () => {
    Player.togglePlay(playerContext, setPlayerContext);
  }

  return (
    <React.Fragment>
      <Box sx = {{height: {xs:"45px",md:"50px"},   flexShrink: 0}}>
        <img 
          alt="" 
          src={(queueIsEmpty? URLMAIN + "/static/images/song_covers/default.png" : URLMAIN + currentSong.cover_url )} 
          height="100%" 
          style={{borderRadius: "10%"}}
        />
      </Box>
      <IconButton onClick={prev}><SkipPreviousIcon/></IconButton>
      <Checkbox 
        checked={playerContext.isPlaying? true : false}
        color='default' 
        icon={<PlayArrowIcon/>} 
        checkedIcon={<PauseIcon/>} 
        onChange={togglePlay}  
      />
      <IconButton onClick={next}><SkipNextIcon/></IconButton>
      <Box sx={{minWidth: 0,flexGrow: 1,}}>
        <Typography noWrap variant="body1">{(queueIsEmpty? "Queue is empty" : currentSong.title)}</Typography>
        <Typography noWrap variant="subtitle2" >{(queueIsEmpty? "" : currentSong.artists[0].name)}</Typography>
      </Box>
    </React.Fragment>
  );

}

