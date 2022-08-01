import Slider from '@mui/material/Slider';
import React, { useState } from 'react';

export function PlayerSlider(props) {
  
  const [sliderTime, setSliderTime] = useState(0);
  
  React.useEffect(() => {
    const tmr = setInterval(() => {setSliderTime(props.audio.currentTime);}, 50);
    return () => clearInterval(tmr);
  },[props.audio]);

  console.log("Creating new handleSliderChange");
  const handleSliderChange = (event, newTime) => {
    setSliderTime(newTime);
    props.audio.currentTime=newTime;
  };

  return (
    <Slider   
      value={sliderTime}
      min={0}
      step={0.01}
      max={props.audio.duration}
      aria-label="Default" 
      color="info" 
      onChange={handleSliderChange}
    />

  )

}