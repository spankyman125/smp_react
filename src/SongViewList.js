import React from 'react';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import SongViewListItem from "./SongViewListItem"

export default function SongViewList(props) {
  return (
    <Box sx= {{ 
      width: '100%', 
      height: "100%", 
    }}>
      <FixedSizeList
        height={props.height}
        width="100%"
        itemSize={64}
        itemCount={20}
        overscanCount={5}
        itemData={[
          {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
          {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
          {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
          {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
          {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
          {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
          {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
          {name:"data-example2",val:"data-example2",},{name:"data-example1",val:"data-example1",},
        ]}
      >
        {SongViewListItem}
      </FixedSizeList>
    </Box>
  );
}