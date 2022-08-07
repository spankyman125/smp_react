import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { URLMAIN } from 'app/Consts';
import { useNavigate } from "react-router-dom";

export function AlbumCard({album}) {
  const navigate = useNavigate();
  
  const onClick = () => {
    navigate('/albums/' + album.id + "/songs");
  }

  return (
    <Box 
      onClick={onClick} 
      sx={{ width: { xs:"150px", lg:"200px"}}}
    > 
      <Box
        component="img" 
        src={URLMAIN + album.cover_url}
        alt={album.title}
        width="100%"
        sx={{borderRadius:"5%"}}>
      </Box>
      <Box sx={{p:"0px 0px 0px 5px"}}>
        <Typography gutterBottom variant="subtitle2" noWrap>
          {album.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" noWrap>
          {album.release_date}
        </Typography>
      </Box>
    </Box>
  );
}
