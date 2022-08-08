import '@fontsource/roboto/300.css';
import React, { useEffect } from 'react';

import { Typography } from '@mui/material';
import { HomeAPI } from "api/HomeAPI";
import { useSnackbar } from 'notistack';
import { useState } from "react";
import { ArtistCard } from "../artist/ArtistCard";
import { CardsList } from "../CardsList";

export function RandomArtistsList() {
  const [isLoaded, setIsLoaded] = useState(false); 
  const [artists, setArtists] = useState(null); 
  const { enqueueSnackbar, closeSnack } = useSnackbar();

  const fetchData = () => {
    HomeAPI.get_random_artists(10)
    .then(
      (result) => {
        enqueueSnackbar("Random Artists received", { variant: 'info' });
        setIsLoaded(true);
        setArtists(result);
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
          Random Artists
        </Typography>
        <CardsList>
          {artists.map(
            (artist)=>(<ArtistCard key={artist.id} artist={artist}/>)
          )}
        </CardsList>
      </React.Fragment>
    )
  else
    return (
      <div>Loading</div>
    )
}

