import { Player } from 'app/Player';
import * as React from 'react';
import { useState } from "react";

export const PlayerContext = React.createContext({
  queue: {position:-1, songs:[]},
  isPlaying: false,
  audio:null
});

export const PlayerProvider = ({children}) => {
  const [playerContext, setPlayerContext] = useState({
    queue: {position:-1, songs:[]},
    isPlaying: false,
    audio: null
  });
  
  Player.playerContext = playerContext;
  Player.setPlayerContext = setPlayerContext;
  const contextValue = {playerContext, setPlayerContext}
  console.log("App context", playerContext)
  
  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>
}