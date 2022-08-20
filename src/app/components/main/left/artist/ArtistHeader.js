import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { Header } from "../Header";
import { ArtistCardImage, ArtistCardLikeButton } from './ArtistCard';


export const ArtistHeader = ({ artist }) => {
  return (
    <Header>
      <ArtistHeaderImage artist={artist} />
      <ArtistHeaderText artist={artist} />
    </Header>
  );
}

const ArtistHeaderImage = ({ artist }) => {
  return (
    <Box
      sx={{
        minWidth: "200px",
        width: "200px",
        height: "200px",
        position: "relative"
      }}
    >
      <ArtistCardImage artist={artist}>
        <ArtistCardLikeButton artist={artist} />
      </ArtistCardImage>
    </Box>
  );
}

const ArtistHeaderText = ({ artist }) => {
  return (
    <Box>
      <Typography variant="h6">
        Artist
      </Typography>
      <Typography variant="h4">
        {artist?.name || <Skeleton variant="text" width={200} />}
      </Typography>
    </Box>
  );
}