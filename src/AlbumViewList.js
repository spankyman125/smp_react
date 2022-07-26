import React from 'react';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import SongViewListItem from "./SongViewListItem"

export default function AlbumViewList(props) {
  let itemData=[
    {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
    {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
    {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
    {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
    {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
    {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
    {name:"data-example1",val:"data-example1",},{name:"data-example1",val:"data-example1",},
    {name:"data-example2",val:"data-example2",},{name:"data-example1",val:"data-example1",},
  ]
  return (
    <Box>
      {itemData.map((item,index) => (
          <SongViewListItem data={itemData} index={index}/>
      ))}
    </Box>
  );
}