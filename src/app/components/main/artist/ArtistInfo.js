import { Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";

import { URLMAIN } from "app/Consts";
import HeaderInfo from "app/components/main/HeaderInfo";

export default function ArtistInfo({artist}) {
  return (
    <HeaderInfo image={URLMAIN + artist.cover_url}>
      <ArtistmInfoText artist={artist}/>
    </HeaderInfo>
  );
}

function ArtistmInfoText({artist}) {
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