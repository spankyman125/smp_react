import * as React from 'react';
import { useState } from "react";

export const MainSongsContext = React.createContext([]);

export const MainSongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

  const contextValue = { songs, setSongs }

  return <MainSongsContext.Provider value={contextValue}>{children}</MainSongsContext.Provider>
}