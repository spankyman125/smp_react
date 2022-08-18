import { Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import { URLMAIN_STATIC } from "app/Consts";
import { Header } from "../Header";
import Skeleton from '@mui/material/Skeleton';


export const AlbumHeader = ({ album }) => {
  return (
    <Header>
      <AlbumHeaderImage image={album?.cover_url} />
      <AlbumHeaderText album={album} />
    </Header>
  );
}

const AlbumHeaderText = ({ album }) => {
  return (
    <>
      <Typography variant="h6">
        Album
      </Typography>
      <Typography variant="h4">
        {album ?
          album.title
          :
          <Skeleton variant="text" width={200} />
        }
      </Typography>
      {album?.artists ?
        showArtists(album.artists)
        :
        <Skeleton variant="text" width={200} />
      }
      {album?.songs ?
        showUniqueTags(album.songs)
        :
        <Skeleton variant="text" width={200} />
      }
    </>
  );
}

const AlbumHeaderImage = ({ image }) => {
  return (
    <Box sx={{
      position: "relative",
      borderRadius: '50%', width: "200px", height: "200px"
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

const showArtists = (artists) => {
  return artists.map((artist, i) => (
    <MuiLink
      variant="h5"
      component={RouterLink}
      to={"/artists/" + artist.id}
      underline="none"
      sx={{ color: "info.main" }}
      key={artist.id}
    >
      {artist.name}{i != artists.length - 1 ? ', ' : ''}
    </MuiLink>
  ))
}

const showUniqueTags = (songs) => {
  let tagsUnique = new Array();
  let idsUnique = new Set();
  for (const song of songs)
    for (const tag of song.tags) {
      if (!idsUnique.has(tag.id)) {
        tagsUnique.push(tag);
        idsUnique.add(tag.id);
      }
    }
  return (
    <Typography variant="subtitle1" sx={{ color: "info.dark" }}>
      {tagsUnique.map((tag, i) => (
        tag.name + (i != tagsUnique.length - 1 ? ', ' : '')
      ))}
    </Typography>
  )
}