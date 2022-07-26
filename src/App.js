import { Outlet } from "react-router-dom";
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import SmpAppBar  from "./SmpAppBar";
import SmpBottomAppBar  from "./SmpBottomAppBar";
import useWindowDimensions  from "./ViewPortSizeHook";
import SongViewList  from "./SongViewList";

export default function App() {
  const { height, width } = useWindowDimensions();

  return(
    <Container maxWidth="false" sx={{minHeight:"100%", display:"flex", flexDirection:"column"}} >
      <SmpAppBar />
      <Grid container sx={{flex:"1 0 auto",borderRight:"1px dashed gray",borderLeft:"1px dashed gray" }}>
        <Grid item xl={8} md={8} xs={12} sx={{paddingLeft:"24px", paddingTop:"24px", paddingBottom: "16px", borderRight:"1px dashed gray"}}>
          <Outlet />
        </Grid>
        <Grid item xl={4} md={4} xs={0}>
          <Box sx={{position:"sticky",top:"80px"}}>
            <SongViewList height={height-64}/>
          </Box>
        </Grid>
          <SmpBottomAppBar sx={{flex:"0 0 auto"}}/>
      </Grid>
    </Container>
  )
}