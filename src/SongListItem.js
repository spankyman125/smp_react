import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import '@fontsource/roboto/300.css';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Container from '@mui/material/Container';
import { Link as MuiLink } from '@mui/material';
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Player } from "./Player";
import { PlayerContext } from "./PlayerContext";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';

export function MoreMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton 
        // id="basic-button"
        // aria-controls={open ? 'basic-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="showOnHover" 
        sx={{ 
          width:"40px", 
          display:"none",
          "@media(any-pointer: coarse)": {
            display:"inline-flex"
          }  
        }}>
        <MoreHorizIcon/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Action 1</MenuItem>
        <MenuItem onClick={handleClose}>Action 2</MenuItem>
      </Menu>
    </React.Fragment>
  );
}



const PopupInfo = ({song}) => {
  return (
    <React.Fragment>
      <IconButton>
        <FavoriteBorderIcon/>
      </IconButton>
      <IconButton 
        className="hideOnHover"
        sx={{
          width:"40px",
          display:"inline-flex",
          "@media(any-pointer: coarse)":{ 
            display:"none"
          }
        }}
      >
        <ListItemText secondary={new Date(1000 * song.duration).toISOString().substring(14, 19)} />
      </IconButton>
      <MoreMenu/>
      {/* <IconButton 
        className="showOnHover" 
        sx={{ 
          width:"40px", 
          display:"none",
          "@media(any-pointer: coarse)": {
            display:"inline-flex"
          }  
        }}>
        <MoreHorizIcon/>
      </IconButton> */}
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
      key={artist.id}
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
          ':hover': {'.showOnHover': { display:"inline-flex" }, '.hideOnHover': {display:"none"}}, 
          "boxShadow": (!queueIsEmpty && currentSong.id === song.id? "inset 0px 0px 0px 1px grey":"")
          }}
        secondaryAction= {<PopupInfo song={ song }/>}
      >
        <ListItemButton sx={{ height: 64 }} component={ RouterLink } to={ "./songs/" + song.id } onClick={onSongClick}>
          <ListItemText 
            primary={ `${props.index + 1}. ${song.title}`} 
            primaryTypographyProps={{noWrap:true, paddingRight:"100px"}}
            sx={{position:"absolute", top:"0px", paddingTop:"8px"}}
          />
        </ListItemButton>
        <Box sx={{
          position: "absolute",
          top: "50%",
          paddingLeft: "16px",
          display:"inline",
          overflow:"hidden",
          textOverflow:"ellipsis",
          width:"80%",
          whiteSpace:"nowrap"
        }}>
          <ArtistsLinks artists={ song.artists }/>
        </Box>
      </ListItem>
    );
}
