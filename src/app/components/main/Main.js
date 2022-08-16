import { Grid } from '@mui/material';
import { Outlet } from "react-router-dom";
import { QueuePanel } from "app/components/main/right/QueuePanel";

export const Main = () => {
  return (
    <Grid container sx={{ flex:"1 0 auto" }}>
      <Grid item md={8} xs={12}>
        <Outlet />
      </Grid>
      <Grid item md={4} xs={0} zeroMinWidth
        sx={{
          top: "0px",
          maxWidth: {xs:"100vw"},
          width: {xs:"100vw"},
          overflowX: 'clip'
        }}
      >
        <QueuePanel/>
      </Grid>
    </Grid>
  )
}