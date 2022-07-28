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
import { PlayerContext } from "./App"
import { PlayerSlider } from "./PlayerSlider"

export default function Player(props) {

  const {playerContext, setPlayerContext} = useContext(PlayerContext);

  const [audio, setAudio] = useState(
    playerContext.currentSong ? 
    new Audio(URLMAIN + playerContext.currentSong.file_url)
    :
    null
    );

  if(playerContext.isPlaying)
    audio.play();
  else
    audio.pause();

  const next = () => {
    if(playerContext.queue.songs[playerContext.queue.position+1]){
      audio.pause();
      playerContext.currentSong = playerContext.queue.songs[playerContext.queue.position+1];
      playerContext.queue.position += 1;
      setPlayerContext({...playerContext});
      setAudio(new Audio(URLMAIN + playerContext.currentSong.file_url));
    }
  } 

  const prev = () => {
    if(playerContext.queue.songs[playerContext.queue.position-1]){
      audio.pause();
      playerContext.currentSong = playerContext.queue.songs[playerContext.queue.position-1];
      playerContext.queue.position -= 1;
      setPlayerContext({...playerContext});
      setAudio(new Audio(URLMAIN + playerContext.currentSong.file_url));
    }
  } 

  const togglePlay = () => {
    if(playerContext.isPlaying) {
      playerContext.isPlaying = false;
      setPlayerContext({...playerContext});
    }
    else {
      playerContext.isPlaying = true;
      setPlayerContext({...playerContext});
    } 
  }

  return (
    <Stack direction='row' width="100%" alignItems="center">
      <Box sx = {{height: {lg:"48px",sm:"64px",xs:'48px'},  padding:"0px 10px 0px 10px",flexShrink: 0}}>
        <img alt= "" src={URLMAIN + playerContext.currentSong.cover_url} width="100%" height="100%" style={{borderRadius: "7%"}}/>
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
          <Typography variant="body1">{playerContext.currentSong.title}</Typography>
          <Typography noWrap variant="caption">{playerContext.currentSong.artists[0].name}, {playerContext.currentSong.artists[1].name}</Typography>
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 1, p:"0px 10px 0px 10px", display: { xs: 'none', sm: 'flex' }}}>
        <PlayerSlider audio={audio} />
      </Box>
    </Stack>
  );

}

