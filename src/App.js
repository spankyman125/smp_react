import { Outlet } from "react-router-dom";
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import SmpAppBar  from "./SmpAppBar";
import SmpBottomAppBar  from "./SmpBottomAppBar";
import useWindowDimensions  from "./ViewPortSizeHook";
import SongViewList  from "./SongViewList";


import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    // mode:"dark",
    primary: {
      // Purple and green play nicely together.
      main: '#2f524e',
    },
    background: {
      paper: '#e8e8de',
      default: '#e8e8de',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#2f524e',
    },
    info: {
      // This is green.A700 as hex.
      main: '#48808f',
    },
  },
});

export default function App() {
  const { height, width } = useWindowDimensions();
  
  return(
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Container maxWidth="false" sx={{padding:"0px 0px 0px 0px", minHeight:"100%", display:"flex", flexDirection:"column", width:{md:"100%"}}} >
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
      </ThemeProvider>
    </React.Fragment>
  )
}





// primary: {
//   // Purple and green play nicely together.
//   main: '#e8e8de',
//   light: '#e8e8de',
//   dark: '#e8e8de',
// },
// secondary: {
//   // This is green.A700 as hex.
//   main: '#2f524e',
// },
// info: {
//   // This is green.A700 as hex.
//   main: '#787ca1',
// },