import React from 'react';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import AlbumViewListItem from "./AlbumViewListItem"

export default function AlbumViewList(props) {
  return (
    <Box sx= {{ 
        width: props.width,
        height: props.height, 
        maxWidth: props.maxWidth, 
        bgcolor: props.bgcolor 
    }}>
      <FixedSizeList
        height={460}
        width={850}
        itemSize={46}
        itemCount={50}
        overscanCount={5}
        itemData={[{
            name:"data-example1",
            val:"data-example1",
          },
          {
            name:"data-example2",
            val:"data-example2",
          }
        ]}
      >
        {AlbumViewListItem}
      </FixedSizeList>
    </Box>
  );
}