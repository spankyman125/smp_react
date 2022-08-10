import '@fontsource/roboto/300.css';
import React, { useEffect } from 'react';

import { Typography } from '@mui/material';
import { HomeAPI } from "api/HomeAPI";
import { useSnackbar } from 'notistack';
import { useState } from "react";
import { AlbumCard } from "../album/AlbumCard";
import { CardsList } from "../CardsList";

export function RandomAlbumsList() {
  const [isLoaded, setIsLoaded] = useState(false); 
  const [albums, setAlbums] = useState(null); 
  const {enqueueSnackbar, closeSnack} = useSnackbar();

  const fetchData = () => {
    HomeAPI.get_random_albums(10)
    .then(
      (result) => {
        enqueueSnackbar("Albums received", { variant: 'info' });
        setIsLoaded(true);
        setAlbums(result);
      }
    )
    .catch((error)=>{
      enqueueSnackbar(error.message, { variant: 'error' });
    })
  }
    
  useEffect(()=>fetchData(),[])
  
  if(isLoaded)
    return (
      <React.Fragment>
        <Typography variant='h6' padding={2}>
          Random Albums
        </Typography>
        <CardsList>
          {albums.map(
            (album)=>(<AlbumCard key={album.id} album={album}/>)
          )}
        </CardsList>
      </React.Fragment>
    )
  else
    return (
      <div>Loading</div>
    )
}

