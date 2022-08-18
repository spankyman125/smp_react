import Grid from '@mui/material/Grid';


export function CardsGrid({ children }) {
  return (
    <Grid container spacing={2}>
      {children?.map((child, index) => (<Grid item key={index}>{child}</Grid>))}
    </Grid>
  );
}

