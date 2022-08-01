import React from 'react';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import SongListItem from "./SongListItem"

export default function SongsViewList(props) {
  return (
    <Box sx= {{ 
      width: '100%', 
      height: "100%", 
    }}>
      {/* <FixedSizeList
        height={props.height}
        width="100%"
        itemSize={64}
        itemCount={20}
        overscanCount={5}
        itemData={props.albums.songs}
      >
        {SongListItem}
      </FixedSizeList> */}
    </Box>
  );
}