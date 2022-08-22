import { Box } from '@mui/material';
import {
  AlbumCardImage,
  AlbumCardLikeButton,
  AlbumCardText
} from "app/components/main/left/album/AlbumCard"
import Typography from '@mui/material/Typography';


export const SearchAlbumCard = ({ album }) => {
  return (
    <Box
      sx={{
        minWidth: { xs: "70px", sm: "70px", lg: "70px" },
        width: { xs: "70px", sm: "70px", lg: "70px" },
        position: "relative"
      }}
    >
      <AlbumCardImage album={album} />
      <SearchAlbumCardText album={album} />
    </Box>
  )
}

export const SearchAlbumCardText = ({ album }) => {
  return (
    <>
      <Typography variant="subtitle2" noWrap>
        {album?.title}
      </Typography>
    </>
  )
}