import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AlbumAPI } from 'api/AlbumAPI';
import { useNavigate } from "react-router-dom";
import { CardImage, CardLikeButton } from '../Card';


export const AlbumCard = ({ album }) => {
  return (
    <Box
      sx={{
        minWidth: { xs: "120px", sm: "150px", lg:"180px" },
        width: { xs: "120px", sm: "150px", lg:"180px" },
        position: "relative"
      }}
    >
      <AlbumCardImage album={album} >
        <AlbumCardLikeButton album={album} />
      </AlbumCardImage>
      <AlbumCardText album={album} />
    </Box>
  )
}

export const AlbumCardImage = ({ album, children }) => {
  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate('/albums/' + album.id);
  }
  return (
    <CardImage
      image={album?.cover_url}
      onClick={handleImageClick}
      sx={{ borderRadius: "5%" }}
    >
      {children}
    </CardImage>
  )
}

export const AlbumCardLikeButton = ({ album }) => {
  const likeCallback = () => {
    AlbumAPI.like(album?.id);
  }
  if (album)
    return <CardLikeButton likeCallback={likeCallback} isLiked={album?.liked} />
}

export const AlbumCardText = ({ album }) => {
  return (
    <>
      <Typography variant="subtitle2" noWrap>
        {album?.title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" noWrap>
        {album?.release_date}
      </Typography>
    </>
  )
}