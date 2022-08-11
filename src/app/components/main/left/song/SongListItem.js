import '@fontsource/roboto/300.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link as MuiLink } from '@mui/material/';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Player } from "app/Player";
import React from 'react';
import { Link as RouterLink } from "react-router-dom";


export function MoreMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToQueue = () => {
    Player.push(props.song);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton 
        onClick={handleClick}
        className="showOnHover" 
        sx={{ 
          width: "40px", 
          display: "none",
          "@media(any-pointer: coarse)": {
            display:"inline-flex"
          }  
        }}>
        <MoreHorizIcon/>
      </IconButton>
      <Menu
        id= "basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleAddToQueue}>Add to queue</MenuItem>
        <MenuItem onClick={handleClose}>Action 2</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const PopupInfo = (props) => {
  return (
    <React.Fragment>
      <IconButton>
        <FavoriteBorderIcon/>
      </IconButton>
      <Box 
        className="hideOnHover"
        sx={{
          width: "40px",
          display: "inline-flex",
          "@media(any-pointer: coarse)":{ 
            display:"none"
          }
        }}
      >
        <ListItemText secondary={new Date(1000 * props.song.duration).toISOString().substring(14, 19)} />
      </Box>
      <MoreMenu song={props.song} playerContext={props.playerContext} setPlayerContext={props.setPlayerContext}/>
    </React.Fragment>
  )
}

const ArtistsLinks = ({artists}) => {
  return artists.map((artist, i) =>(
    <MuiLink 
      variant="subtitle2"
      component={RouterLink} 
      to={"/artists/" + artist.id + "/songs"}
      underline="none"
      sx={{color:"info.main"}}
      key={artist.id}
    >
      {artist.name}{i==artists.length-1 ? '' : ', '}
    </MuiLink>
  ))
}

export default function SongListItem(props) {
    const song = props.song;
    const onSongClick = () => {
      // navigate('./songs/'); //TODO: add songId to url
      Player.switchTo(props.index); //diff on diff views
    }
    
    
    return (
      <ListItem
        key={ props.index + song.id  } 
        disablePadding 
        sx= {{
          ':hover': {'.showOnHover': { display:"inline-flex" }, '.hideOnHover': {display:"none"}}, 
          "boxShadow": (props.selected? "inset 0px 0px 0px 1px grey":""),
        }}
        secondaryAction= {<PopupInfo song={song} playerContext={props.playerContext} setPlayerContext={props.setPlayerContext}/>}
      >
        <ListItemButton sx={{ height: 64 }} onClick={onSongClick}>
          <ListItemText 
            primary={ `${props.index + 1}. ${song.title}`} 
            primaryTypographyProps={{noWrap: true, paddingRight: "60px"}}
            sx={{p: "0px 0px 16px 0px"}}
          />
        </ListItemButton>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "0%",
          paddingLeft: "16px",
          display: "inline-block",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "70%",
          whiteSpace: "nowrap",
        }}>
          <ArtistsLinks artists={ song.artists }/>
        </Box>
      </ListItem>
    );
}
