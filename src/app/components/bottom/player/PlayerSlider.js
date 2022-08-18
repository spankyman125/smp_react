import React, { useContext, useState } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

import { PlayerContext } from "app/contexts/PlayerContext";

const MySlider = styled(Slider)(({ theme }) => ({
  padding: 0,
  "@media(any-pointer: coarse)": {
    padding: "0px 0px 0px 0px"
  },
  '& .MuiSlider-thumb': {
    height: 12,
    width: 12,
    backgroundColor: '#fff',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),' +
        '0 4px 8px rgba(0,0,0,0.13),' +
        '0 0 0 1px rgba(0,0,0,0.02)',
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: 36,
    backgroundColor: 'unset',
    width: '100%',
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
    border: "0px",
  },
}));

export const PlayerSlider = () => {
  const { playerContext, setPlayerContext } = useContext(PlayerContext);
  const [sliderTime, setSliderTime] = useState(0);

  React.useEffect(() => {
    if (playerContext.audio) {
      const tmr = setInterval(() => {
        setSliderTime(playerContext.audio.currentTime);
      }, 50);
      return () => clearInterval(tmr);
    }
  }, [playerContext.audio]);

  const handleSliderChange = (event, newTime) => {
    setSliderTime(newTime);
    playerContext.audio.currentTime = newTime;
  };

  const calculateTime = (value = 0) => {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Typography variant='subtitle2' sx={{ p: "0px 12px 0px 12px" }}>
          {calculateTime(playerContext.audio?.currentTime || 0)}
        </Typography>
        <MySlider
          valueLabelDisplay='auto'
          value={sliderTime}
          scale={calculateTime}
          min={0}
          step={0.1}
          max={playerContext.audio?.duration || 1}
          color="info"
          onChange={(playerContext.audio) ? handleSliderChange : null}
          sx={{ height: "12px" }}
        />
        <Typography variant='subtitle2' sx={{ p: "0px 12px 0px 12px" }}>
          {calculateTime(playerContext.audio?.duration || 0)}
        </Typography>
      </Box>
    </>
  )

}