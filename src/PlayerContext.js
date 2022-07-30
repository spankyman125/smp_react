import * as React from 'react';

export const PlayerContext = React.createContext({
  queue: {position:0, songs:[null]},
  current_song: null,
  isPlaying: false
});
