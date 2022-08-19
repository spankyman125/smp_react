import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtistSongsList } from "../song/lists/ArtistSongsList";

import { AlbumCard } from "../album/AlbumCard";
import { CardsGrid } from "../CardsGrid";

const TabPanel = (props) => {
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

export const ArtistTabs = ({ artist, songs, tab }) => {
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    navigate('../' + newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Songs" value="songs" />
          <Tab label="Albums" value="albums" />
        </Tabs>
      </Box>
      <TabPanel value="songs" currentValue={tab}>
        <ArtistSongsList songs={songs} />
      </TabPanel>
      <TabPanel value="albums" currentValue={tab}>
        <Box sx={{ p: "12px 0px 12px 12px" }}>
          <CardsGrid>
            {artist?.albums.map(
              (album) => (<AlbumCard key={album.id} album={album} />)
            )}
          </CardsGrid>
        </Box>
      </TabPanel>
    </Box>
  );
}