import { Box } from '@mui/material';
import {
  ArtistCardImage,
  ArtistCardText,
} from "app/components/main/left/artist/ArtistCard"

export const SearchArtistCard = ({ artist }) => {
  return (
    <Box
      sx={{
        minWidth: { xs: "70px", sm: "70px", lg: "70px" },
        width: { xs: "70px", sm: "70px", lg: "70px" },
        position: "relative"
      }}
    >
      <ArtistCardImage artist={artist} />
      <ArtistCardText artist={artist} />
    </Box>
  )
}
