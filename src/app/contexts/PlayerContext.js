import * as React from 'react';

export const PlayerContext = React.createContext({
  queue: {position:0, songs:["DEFAULT"]},
  isPlaying: false
});
