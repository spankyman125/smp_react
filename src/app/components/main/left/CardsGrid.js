import Grid from '@mui/material/Grid';


export function CardsGrid({ children, sx }) {
  return (
    <Grid container spacing={2} sx={sx}>
      {children?.map((child, index) => (<Grid item key={index}>{child}</Grid>))}
    </Grid>
  );
}

