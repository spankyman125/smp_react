import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Container } from '@mui/material';


export default function HeaderInfo(props) {
  return (
    <Grid container>
      <Grid item sx={{ paddingRight:"20px",minWidth:"200px", maxWidth:"200px", height:"200px"}}>
        <Box sx={{position:"relative", borderRadius:'50%'}}>
          <img src={props.image} width="100%" height="100%" style={{borderRadius: "7%"}}/>
          <Button variant="contained" sx={{position:"absolute", bottom:"5%", right:"5%", height:"35px",width:"35px", minWidth:"5px"}}>
            <FavoriteBorderIcon />
          </Button>
        </Box>
      </Grid>
      <Grid item>
        <Box>
          {props.children}
        </Box>
      </Grid>
    </Grid>
  );
}

