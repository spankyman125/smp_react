import '@fontsource/roboto/300.css';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import ArtistInfo from "./ArtistInfo";
import { ArtistAPI } from "api/ArtistAPI"
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { ArtistTabs } from "./ArtistTabs"
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function ArtistView() {
  
  const [isLoaded, setIsLoaded] = useState(false); 
  const [artist, setArtist] = useState(null); 
  const { enqueueSnackbar, closeSnack } = useSnackbar();
  const urlParams = useParams();
  const navigate = useNavigate();

  switch(urlParams.tab) {
    case "songs":
    case "albums":
      break;
    default:
      navigate('./songs');
      break;
  }

  const fetchData = () => {
    ArtistAPI.get(urlParams.artistId)
    .then(
      (result) => {
        enqueueSnackbar("Artist received", { variant: 'info' });
        setIsLoaded(true);
        setArtist(result);
      },
      (error)=>{
        enqueueSnackbar(error.message, { variant: 'error' });
    })
  }
    
  useEffect(()=>fetchData(),[urlParams.artistId])
    
  if (isLoaded) {
    return(
      <Box>
        <ArtistInfo artist={artist}/>
        <ArtistTabs artist={artist}/>
      </Box>
    )
  }
  else
    return(
      <Box>
        Loading artist 
      </Box>
    )
}

