import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { URLMAIN_STATIC } from "app/Consts";
import { Header } from "../Header";


export const ArtistHeader = ({ artist }) => {
  return (
    <Header>
      <ArtistHeaderImage image={artist?.cover_url} />
      <ArtistHeaderText artist={artist} />
    </Header>
  );
}

const ArtistHeaderImage = ({ image }) => {
  return (
    <Box sx={{
      position: "relative",
      borderRadius: '50%',
      width: "200px",
      height: "200px"
    }}>
      {image ?
        <img
          src={URLMAIN_STATIC + image}
          width="100%"
          height="100%"
          style={{ borderRadius: "7%" }}
        />
        :
        <Skeleton variant="rectangle" width={200} height={200} />
      }
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          height: "35px",
          width: "35px",
          minWidth: "5px"
        }}>
        <FavoriteBorderIcon />
      </Button>
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