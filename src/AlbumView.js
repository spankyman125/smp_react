import '@fontsource/roboto/300.css';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import AlbumInfo from "./AlbumInfo";
import AlbumViewList from "./AlbumViewList";
import { AlbumAPI } from "api/AlbumAPI"
import { useState } from "react";
import { useParams } from 'react-router-dom';

export function AlbumView() {
  
  const [isLoaded, setIsLoaded] = useState(false); 
  const [album, setAlbum] = useState(null); 
  const urlParams = useParams();

  const fetchData = () => {
    console.log("Fetching data");
    AlbumAPI.get(urlParams.albumId)
    .then(
      (result) => {
        setIsLoaded(true);
        setAlbum(result);
      }
    )
    .catch((error)=>{console.debug(error)})
  }
    
  useEffect(()=>fetchData(),[urlParams.albumId])
    
  if (isLoaded) {
    return(
      <Box>
        <AlbumInfo album={album}/>
        <AlbumViewList album={album}/>
      </Box>
    )
  }
  else
    return(
      <div>Loading</div>
    )
}

