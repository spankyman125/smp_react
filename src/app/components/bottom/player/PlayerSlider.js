import Slider from '@mui/material/Slider';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const MySlider = styled(Slider)(({ theme }) => ({
  padding: 0,
  "@media(any-pointer: coarse)": {
    padding:"0px 0px 0px 0px"
  },
  '& .MuiSlider-thumb': {
    height: 12,
    width: 12,
    backgroundColor: '#fff',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: 36,
    backgroundColor: 'unset',
    width:'100%',
    color: "#fff",
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 0.3,
    backgroundColor: '#bfbfbf',
  },
  '& .MuiSlider-track': {
    border:"0px",
  },
}));

export function PlayerSlider(props) {
  
  const [sliderTime, setSliderTime] = useState(0);

  React.useEffect(() => {
    if (props.audio) {
      const tmr = setInterval(() => {setSliderTime(props.audio.currentTime);}, 50);
      return () => clearInterval(tmr);
    }
  },[props.audio]);

  const handleSliderChange = (event, newTime) => {
    setSliderTime(newTime);
    props.audio.currentTime=newTime;
  };

  const calculateValue = (value) => {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <React.Fragment>
      <Box sx={{
          display: 'flex',
          alignItems: 'center',
      }}>
        <Typography variant='subtitle2' sx={{p:"0px 12px 0px 12px"}}>{(props.audio)? calculateValue(sliderTime):"0:00"}</Typography>
        <MySlider
          valueLabelDisplay='auto'
          value={sliderTime}
          scale={calculateValue}
          min={0}
          step={0.1}
          max={(props.audio && props.audio.duration)? props.audio.duration:1}
          color="info" 
          onChange={(props.audio)? handleSliderChange:null}
          sx={{height:"12px"}}
        />
        <Typography variant='subtitle2'sx={{p:"0px 12px 0px 12px"}}>{(props.audio && props.audio.duration)? calculateValue(props.audio.duration):"0:00"}</Typography>
      </Box>
    </React.Fragment>
  )

}