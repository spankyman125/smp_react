import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { URLMAIN_STATIC } from 'app/Consts';
import { useNavigate } from "react-router-dom";

export function ArtistCard({artist}) {
  const navigate = useNavigate();
  
  const onClick = () => {
    navigate('/artists/' + artist.id + "/songs");
  }

  return (
    <Box 
      onClick={onClick} 
      sx={{ width: { xs:"150px", lg:"200px"}}}
    > 
      <Box
        component="img" 
        src={URLMAIN_STATIC + artist.cover_url}
        alt={artist.name}
        width="100%"
        sx={{borderRadius:"50%"}}>
      </Box>
      <Typography gutterBottom variant="subtitle2" noWrap sx={{textAlign:"center"}}>
        {artist.name}
      </Typography>
    </Box>
  );
}
