import Slider from '@mui/material/Slider';
import React, { useState } from 'react';

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

  return (
    <Slider   
      value={sliderTime}
      min={0}
      step={0.01}
      max={(props.audio)? props.audio.duration:1}
      aria-label="Default" 
      color="info" 
      onChange={(props.audio)? handleSliderChange:null}
    />

  )

}