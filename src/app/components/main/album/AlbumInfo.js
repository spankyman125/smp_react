import { Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";

import { URLMAIN_STATIC } from "app/Consts";
import HeaderInfo from "app/components/main/HeaderInfo";

export default function AlbumInfo(props) {
  return (
    <HeaderInfo image={URLMAIN_STATIC + props.album.cover_url}>
      <AlbumInfoText album={props.album}/>
    </HeaderInfo>
  );
}

const showArtists = (artists) => {
  return artists.map((artist, i)=> (
    <MuiLink 
      variant="h5"
      component={RouterLink} 
      to={"/artists/" + artist.id}
      underline="none"
      sx={{color:"info.main"}}
      key={artist.id}
    >
      {artist.name}{i!=artists.length-1 ? ', ' : ''}
    </MuiLink>
  ))
}

const showUniqueTags = (songs) => {
  let tagsUnique = new Array();
  let idsUnique = new Set();
  for (const song of songs)
    for (const tag of song.tags) {
      if(!idsUnique.has(tag.id)) {
        tagsUnique.push(tag);
        idsUnique.add(tag.id);
      }
    }
  return (
    <Typography variant="subtitle1" sx={{color:"info.dark"}}>
      {tagsUnique.map((tag, i)=>(
        tag.name + (i != tagsUnique.length-1 ? ', ' : '')
      ))}
    </Typography>
  )
}

function AlbumInfoText(props) {
  return (
    <Box>
      <Typography variant="h6">
        Album
      </Typography>
      <Typography variant="h4">
        {props.album.title}
      </Typography>
        {showArtists(props.album.artists)}
      <Box>
        {showUniqueTags(props.album.songs)}
      </Box>
    </Box>
  );
}