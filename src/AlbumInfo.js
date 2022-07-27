import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink }  from "react-router-dom";

import HeaderInfo from "./HeaderInfo"
import { URLMAIN } from "./Consts" 

export default function AlbumInfo(props) {
  return (
    <HeaderInfo image={URLMAIN + props.album.cover_url}>
      <AlbumInfoText album={props.album}/>
    </HeaderInfo>
  );
}

function AlbumInfoText(props) {
  return (
    <Box>
      <Typography variant="h6">
        Album
      </Typography>
      <Typography variant="h4">
        {props.album.title}
      </Typography>
        <MuiLink 
          variant="h5"
          component={RouterLink} 
          to={"/artists/" + props.album.artists[0].id}
          underline="none"
          sx={{color:"info.main"}}
        >
          {props.album.artists[0].name}
        </MuiLink>
        <Typography variant="subtitle1">
          {props.album.release_date} - {props.album.songs[0].tags[0].name} 
            {/* TODO: all link, all tags */}
        </Typography>
    </Box>
  );
}