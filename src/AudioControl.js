import { Player } from "Player";
import { useContext, useState } from "react";
import { URLMAIN } from "./Consts";
import { PlayerContext } from "./PlayerContext";
import { PlayerSlider } from "./PlayerSlider";

export function AudioControl(props) {

  const {playerContext, setPlayerContext} = useContext(PlayerContext);  
  const [audio, setAudio] = useState(new Audio(URLMAIN + playerContext.queue.songs[playerContext.queue.position].file_url));
  
  const onSongEnded = (event) => {
    console.log('Song ended event');
    if(!Player.next(playerContext, setPlayerContext)) {
      Player.pause(playerContext, setPlayerContext);
      console.log('Queue is empty');
    }
  }

  if(playerContext.isPlaying)
    audio.play()
  else
    audio.pause()

  if(audio.src != URLMAIN + playerContext.queue.songs[playerContext.queue.position].file_url) {
    audio.pause();
    audio.removeEventListener('ended',onSongEnded);
    let newAudio = new Audio(URLMAIN + playerContext.queue.songs[playerContext.queue.position].file_url);
    newAudio.addEventListener('ended',onSongEnded);
    setAudio(newAudio);
    console.log("Audio src changed to", newAudio.src );
    if(playerContext.isPlaying)
      newAudio.play();
    
    return <PlayerSlider audio={newAudio} />
  }
  return <PlayerSlider audio={audio} />
  

}
