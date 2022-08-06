import '@fontsource/roboto/300.css';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import AlbumInfo from "./AlbumInfo";
import SongsList from "../song/SongsList";

import { AlbumAPI } from "api/AlbumAPI"
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export function AlbumView() {
  
  const [isLoaded, setIsLoaded] = useState(false); 
  const [album, setAlbum] = useState(null); 
  const { enqueueSnackbar, closeSnack } = useSnackbar();
  const urlParams = useParams();

  const fetchData = () => {
    AlbumAPI.get(urlParams.albumId)
    .then(
      (result) => {
        enqueueSnackbar("Album received", { variant: 'info' });
        setIsLoaded(true);
        setAlbum(result);
      }
    )
    .catch((error)=>{
      enqueueSnackbar(error.message, { variant: 'error' });
    })
  }
    
  useEffect(()=>fetchData(),[urlParams.albumId])
    
  if (isLoaded) {
    return(
      <Box>
        <AlbumInfo album={album}/>
        <SongsList songs={album.songs}/>
      </Box>
    )
  }
  else
    return(
      <div>Loading</div>
    )
}

