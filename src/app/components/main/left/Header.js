import { Grid } from '@mui/material';


export const Header = ({ children }) => {
  return (
    <Grid container sx={{ p: "12px 0px 12px 12px" }}>
      <Grid item sx={{ paddingRight: "10px" }}>
        {children[0]}
      </Grid>
      <Grid item>
        {children[1]}
      </Grid>
    </Grid>
  );
}
