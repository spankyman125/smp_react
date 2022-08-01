import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import '@fontsource/roboto/300.css';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link as MuiLink } from '@mui/material';
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Player } from "./Player";
import { PlayerContext } from "./PlayerContext";


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
    let currentSong = null;
    
    const onSongClick = () => {
      console.log("Switched to song:",song)
      Player.setQueue(playerContext, setPlayerContext,{position:0,songs:[song]});
    }
    
    const queueIsEmpty = (playerContext.queue.songs.length===0)? true : false
    if(!queueIsEmpty) {
      currentSong = playerContext.queue.songs[playerContext.queue.position];
    }
    
    return (
      <ListItem 
        key={ props.index } 
        disablePadding 
        sx= {{
          ':hover': {'.hiddenInfo': { visibility:"visible" }}, 
          "boxShadow": (!queueIsEmpty && currentSong.id === song.id? "inset 0px 0px 0px 1px grey":"")
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