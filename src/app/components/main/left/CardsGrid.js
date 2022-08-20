import Grid from '@mui/material/Grid';
import React from 'react';

export function CardsGrid({ children, sx }) {
  return (
    <Grid container spacing={2} sx={sx}>
      {React.Children.map(children, (child, index) => (<Grid item key={index}>{child}</Grid>))}
    </Grid>
  );
}

