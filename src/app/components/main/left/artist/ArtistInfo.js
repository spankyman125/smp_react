import { Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";

import { URLMAIN_STATIC } from "app/Consts";
import HeaderInfo from "../HeaderInfo";

export default function ArtistInfo({artist}) {
  return (
    <HeaderInfo image={URLMAIN_STATIC + artist.cover_url}>
      <ArtistInfoText artist={artist}/>
    </HeaderInfo>
  );
}

function ArtistInfoText({artist}) {
  return (
    <Box>
      <Typography variant="h6">
        Artist
      </Typography>
      <Typography variant="h4">
        {artist.name}
      </Typography>
    </Box>
  );
}