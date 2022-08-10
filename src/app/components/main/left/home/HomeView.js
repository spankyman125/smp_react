import '@fontsource/roboto/300.css';
import React from 'react';

import { RandomAlbumsList } from "./RandomAlbumsList";
import { RandomArtistsList } from "./RandomArtistsList";

export function HomeView() {
  return (
    <React.Fragment>
      <RandomAlbumsList/>
      <RandomArtistsList/>
    </React.Fragment>
  )
}

