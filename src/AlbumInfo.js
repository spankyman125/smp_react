import React from 'react';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import SongViewListItem from "./SongViewListItem"
import HeaderInfo from "./HeaderInfo"
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Link, Link as RouterLink }  from "react-router-dom";
import { Link as MuiLink } from '@mui/material';

const URLMAIN = "http://septerra.duckdns.org:33333";

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