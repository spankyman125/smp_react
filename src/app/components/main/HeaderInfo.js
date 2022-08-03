import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function HeaderInfo(props) {
  return (
    <Grid container sx={{paddingBottom:"10px"}}>
      <Grid item sx={{ paddingRight:"10px"}}>
        <Box sx={{position:"relative", borderRadius:'50%',width:"200px",height:"200px"}}>
          <img src={props.image} width="100%" height="100%" style={{borderRadius: "7%"}}/>
          <Button variant="contained" sx={{position:"absolute", bottom:"10px", right:"10px", height:"35px",width:"35px", minWidth:"5px"}}>
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

