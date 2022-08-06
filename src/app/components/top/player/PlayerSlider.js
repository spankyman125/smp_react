import Slider from '@mui/material/Slider';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

const MySlider = styled(Slider)(({ theme }) => ({
  height: 6,
  padding: 0,
  '& .MuiSlider-thumb': {
    height: 8,
    width: 8,
    backgroundColor: '#fff',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: 40,
    color: theme.palette.text.primary,
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
  '& .MuiSlider-mark': {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
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
      {/* <MySlider
        valueLabelDisplay='auto'
        value={sliderTime}
        scale={calculateValue}
        min={0}
        step={0.1}
        max={(props.audio)? props.audio.duration:1}
        aria-label="Default" 
        color="info" 
        onChange={(props.audio)? handleSliderChange:null}
      />
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography variant='subtitle2'>{(props.audio)? calculateValue(sliderTime):"0:00"}</Typography>
        <Typography variant='subtitle2'>{(props.audio)? calculateValue(props.audio.duration):"0:00"}</Typography>
      </Box> */}
    </React.Fragment>
  )

}