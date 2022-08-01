import React from 'react';
import { useState,useContext } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Stack } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Checkbox from '@mui/material/Checkbox';

import { URLMAIN } from "./Consts" 
import { PlayerContext } from "./PlayerContext"
import { PlayerSlider } from "./PlayerSlider"
import { AudioControl } from "./AudioControl"
import { Player } from "./Player"

//TODO: Handle no queue state
export default function PlayerView(props) {

  const {playerContext, setPlayerContext} = useContext(PlayerContext);
  let queueIsEmpty = (playerContext.queue.songs.length===0)? true : false
  console.log("Render PlayView with context", playerContext)
  
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
    <Stack direction='row' width="100%" alignItems="center">
      <Box sx = {{height: {lg:"48px",sm:"64px",xs:'48px'},  padding:"0px 10px 0px 10px",flexShrink: 0}}>
        <img 
          alt="" 
          src={
            (queueIsEmpty? "" : URLMAIN + currentSong.cover_url )
          } 
          width="100%" 
          height="100%" 
          style={{borderRadius: "7%"}}
        />
      </Box>
      <Stack direction={{lg:'row',sm:'column-reverse',xs:'row'}} spacing={0}>
        <Stack direction='row'>
          <IconButton onClick={prev}><SkipPreviousIcon/></IconButton>
          <Checkbox 
            checked={playerContext.isPlaying? true : false}
            color='default' 
            icon={<PlayArrowIcon/>} 
            checkedIcon={<PauseIcon/>} 
            onChange={togglePlay}  
          />
          <IconButton onClick={next}><SkipNextIcon/></IconButton>
        </Stack>
        <Stack direction='column'>
          <Typography noWrap variant="body1">{(queueIsEmpty? "Queue is empty" : currentSong.title)}</Typography>
          <Typography noWrap variant="caption" >{(queueIsEmpty? "" : currentSong.artists[0].name)}</Typography>
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 1, p:"0px 10px 0px 10px", display: { xs: 'none', sm: 'flex' }}}>
        <AudioControl/>
          {/* <PlayerSlider audio={audio} /> */}
        {/* </AudioControl> */}
      </Box>
    </Stack>
  );

}

