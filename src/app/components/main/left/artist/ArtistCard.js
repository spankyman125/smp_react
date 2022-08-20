import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ArtistAPI } from 'api/ArtistAPI';
import { useNavigate } from "react-router-dom";
import { CardImage, CardLikeButton } from '../Card';

export const ArtistCard = ({ artist }) => {
  return (
    <Box
      sx={{
        minWidth: { xs: "120px", sm: "150px", lg: "180px" },
        width: { xs: "120px", sm: "150px", lg: "180px" },
        position: "relative"
      }}
    >
      <ArtistCardImage artist={artist} >
        <ArtistCardLikeButton artist={artist} />
      </ArtistCardImage>
      <ArtistCardText artist={artist} />
    </Box>
  )
}

export const ArtistCardImage = ({ artist, children }) => {
  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate('/artists/' + artist.id);
  }
  return (
    <CardImage
      image={artist?.cover_url}
      onClick={handleImageClick}
      sx={{ borderRadius: "50%" }}
    >
      {children}
    </CardImage>
  )
}

export const ArtistCardLikeButton = ({ artist }) => {
  const likeCallback = () => {
    ArtistAPI.like(artist?.id);
  }
  if (artist)
    return <CardLikeButton likeCallback={likeCallback} isLiked={artist?.liked} />
}

export const ArtistCardText = ({ artist }) => {
  return (
    <Typography variant="subtitle2" noWrap sx={{ textAlign: "center" }}>
      {artist?.name}
    </Typography>
  )
}