import React from 'react';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Container';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '@fontsource/roboto/300.css';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink }  from "react-router-dom";
import { PlayerContext } from "./PlayerContext"
import { useState,useContext } from "react";
import { Player } from "./Player"


const PopupInfo = ({song}) => {
  return (
    <React.Fragment>
      <ListItemText 
        className="hiddenInfo" 
        secondary={new Date(1000 * song.duration).toISOString().substring(14, 19)} 
        sx={{visibility:"hidden", display:"inline-flex"}}
      />
      <IconButton>
        <FavoriteBorderIcon/>
      </IconButton>
      <IconButton>
        <AddIcon className="hiddenInfo" sx={{visibility:"hidden"}}/>
      </IconButton>
    </React.Fragment>
  )
}

const ArtistsLinks = ({artists}) => {
  return artists.map((artist, i) =>(
    <MuiLink 
      variant="subtitle2"
      component={RouterLink} 
      to={"/artists/" + artist.id}
      underline="none"
      sx={{color:"info.main"}}
    >
      {artist.name}{i==artists.length-1 ? '' : ', '}
    </MuiLink>
  ))
}



export default function SongListItem(props) {
    const {playerContext, setPlayerContext} = useContext(PlayerContext);

    const song = props.data[props.index];
    const currentSong = playerContext.queue.songs[playerContext.queue.position];
    const onSongClick = () => {
      console.log("Switched to song:",song)
      Player.setQueue(playerContext, setPlayerContext,{position:0,songs:[song]});
    }

    return (
      <ListItem 
        key={ props.index } 
        disablePadding 
        sx= {{
          ':hover': {'.hiddenInfo': { visibility:"visible" }}, 
          "boxShadow": (currentSong.id === song.id? "inset 0px 0px 0px 1px grey":"")
          }}
        secondaryAction= {<PopupInfo song={ song }/>}
      >
        {/* <ListItemButton sx={{ height: 64 }} onClick={onSongClick}> */}
        <ListItemButton sx={{ height: 64 }} component={ RouterLink } to={ "./songs/" + song.id } onClick={onSongClick}>
          <ListItemText 
            primary={ `${props.index + 1}. ${song.title}`} 
            secondary={ <ArtistsLinks artists={ song.artists }/> }
            primaryTypographyProps={{noWrap:"true", paddingRight:"100px"}}
            secondaryTypographyProps={{noWrap:"true", paddingRight:"100px"}}
          />
        </ListItemButton>
      </ListItem>
    );
}