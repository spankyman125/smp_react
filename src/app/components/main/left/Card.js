import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Button } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { URLMAIN_STATIC } from 'app/Consts';
import { useState } from 'react';

export const CardButton = ({ children }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "15px",
        right: "10px",
      }}
    >
      {children}
    </Box>
  )
}

export const CardLikeButton = ({ isLiked, likeCallback }) => {
  const [liked, setLiked] = useState(isLiked);
  const handleLikeClick = (event) => {
    event.stopPropagation();
    setLiked(!liked);
    likeCallback();
  }

  return (
    <CardButton>
      <Button
        sx={{ width: "35px", height: "35px", minWidth: "0px" }}
        variant="contained"
        onClick={handleLikeClick}
      >
        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </Button>
    </CardButton>
  )
}

export const CardImage = ({ image, onClick, children, sx }) => {
  if (image) {
    return (
      <Box
        sx={{ position: "relative" }}
      >
        <Box
          component="img"
          src={URLMAIN_STATIC + image}
          width="100%"
          onClick={onClick}
          sx={sx}
        />
        {children}
      </Box>
    )
  } else {
    return <Skeleton variant="rectangle" width="200px" height="200px" />
  }
}
