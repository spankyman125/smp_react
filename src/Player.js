import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';

import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Slider from '@mui/material/Slider';

import { URLMAIN } from "./Consts" 

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.audio = new Audio(URLMAIN+props.song.file_url);
    this.state = {
      song: props.song,
    }
  }

  togglePlay = () => {
    this.setState(() => { this.audio.play() });
  }

  render() {
    return (
      <Stack direction='row' width="100%">
        <Box sx = {{height: {lg:"48px",sm:"64px",xs:'48px'},  padding:"0px 10px 0px 10px", alignSelf:'center',flexShrink: 0}}>
          <img src={URLMAIN + this.state.song.cover_url} width="100%" height="100%" style={{borderRadius: "7%"}}/>
        </Box>
        <Stack direction={{lg:'row',sm:'column-reverse',xs:'row'}}>
          <Stack direction='row' sx={{color:"secondary.main"}}>
            <IconButton><SkipPreviousIcon/></IconButton>
            <IconButton onClick={this.togglePlay}><PlayArrowIcon/></IconButton>
            <IconButton><SkipNextIcon/></IconButton>
          </Stack>
          <Stack direction='column' sx={{alignSelf:"center"}}>
            <Typography variant="body1">{this.state.song.title}</Typography>
            <Typography noWrap variant="caption">{this.state.song.artists[0].name}, {this.state.song.artists[1].name}</Typography>
          </Stack>
        </Stack>
        <Box width={300} sx={{alignSelf:"center", flexGrow: 1, p:"0px 10px 0px 10px",display: { xs: 'none', sm: 'flex' }}}>
          <Slider defaultValue={50} aria-label="Default" color="info" />
        </Box>
      </Stack>
    );
  }

}

