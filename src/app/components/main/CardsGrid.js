import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {AlbumCard} from './album/AlbumCard'


export function CardsGrid(props) {
  return (
    <Grid container spacing={2}>
      {props.children.map((child,index)=>(<Grid item key={index}>{child}</Grid>))}
    </Grid>
  );
}

