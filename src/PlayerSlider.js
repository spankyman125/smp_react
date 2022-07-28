import React from 'react';
import { Container } from '@mui/material';
import { useState,useContext } from "react";

import Slider from '@mui/material/Slider';

export function PlayerSlider(props) {
  
  const [sliderTime, setSliderTime] = useState(0);
  console.log("Slider Rendered");
  React.useEffect(() => {
    console.log("Timer set");
    const tmr = setInterval(() => {setSliderTime(props.audio.currentTime);}, 50);
    return () => clearInterval(tmr);
  },[props.audio]);

  const handleSliderChange = (event, newTime) => {
    setSliderTime(newTime);
    props.audio.currentTime=newTime;
  };

  return (
    <Slider   
      value={sliderTime}
      min={0}
      step={0.1}
      max={60}
      aria-label="Default" 
      color="info" 
      onChange={handleSliderChange}
    />
  )

}