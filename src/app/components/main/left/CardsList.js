import { Box, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import IconButton from '@mui/material/IconButton';
import { useRef } from 'react'

export function CardsList(props) {
  const scrolledContainer = useRef(null);

  const scrollLeft = () => {
    scrolledContainer.current.scrollLeft -= 300
  }

  const scrollRight = () => {
    scrolledContainer.current.scrollLeft += 300
  }

  return (
    <Box sx={{position:"relative"}}>
      <IconButton 
        onClick={scrollLeft}
        sx={{
          position:"absolute",
          top:"30%",
          "@media(any-pointer:coarse)":{display:"none"}
        }}
      >
        <ArrowLeftOutlinedIcon fontSize='large'/>
      </IconButton>
      <IconButton 
        onClick={scrollRight}
        sx={{
          position:"absolute",
          top:"30%",
          right:"0%",
          "@media(any-pointer:coarse)":{display:"none"}
        }}
      >
        <ArrowRightOutlinedIcon fontSize='large'/>
      </IconButton>
      <Stack 
        ref={scrolledContainer}
        spacing={2} 
        direction="row" 
        sx={{
          overflowX:"auto",
          scrollBehavior: "smooth",
          p:"5px",
          scrollbarWidth:"none",
          "::-webkit-scrollbar": {
            display:"none"
          }
        }}
      >
        {props.children}
      </Stack>
    </Box>
  );
}

