import { Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";
import { Header } from "../Header";
import { AlbumCardImage, AlbumCardLikeButton } from './AlbumCard';


export const AlbumHeader = ({ album }) => {
  return (
    <Header>
      <AlbumHeaderImage album={album} />
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

const AlbumHeaderImage = ({ album }) => {
  return (
    <Box
      sx={{
        minWidth: "200px",
        width: "200px",
        height: "200px",
        position: "relative"
      }}
    >
      <AlbumCardImage album={album}>
        <AlbumCardLikeButton album={album} />
      </AlbumCardImage>
    </Box>
  )
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