import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SongsList from "../song/SongsList";

import { CardsGrid } from "../CardsGrid"
import { CardsList } from "../CardsList"
import { AlbumCard } from "../album/AlbumCard"
import { Grid } from '@mui/material';

function TabPanel(props) {
  const { children, value, currentValue, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== currentValue}
      id={`simple-tabpanel-${currentValue}`}
      aria-labelledby={`simple-tab-${currentValue}`}
      {...other}
    >
      {value === currentValue && (
          <React.Fragment>{children}</React.Fragment>
      )}
    </div>
  );
}

export function ArtistTabs(props) {
  const urlParams = useParams();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    navigate('./' + newValue,{ replace: true });
  };

  if(urlParams.tab)
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={urlParams.tab} onChange={handleChange}>
            <Tab label="Songs" value="songs"/>
            <Tab label="Albums" value="albums" />
          </Tabs>
        </Box>
        <TabPanel value="songs" currentValue={urlParams.tab}>
          <SongsList songs={props.artist.songs}/>
        </TabPanel>
        <TabPanel value="albums" currentValue={urlParams.tab}>
          <Box sx={{p:"12px 0px 12px 12px"}}>
            <CardsGrid>
              {props.artist.albums.map(
                (album)=>(<AlbumCard key={album.id} album={album}/>)
              )}
            </CardsGrid>
          </Box>
        </TabPanel>
      </Box>
    );
}