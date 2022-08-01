import Box from '@mui/material/Box';
import SongListItem from "./SongListItem";

export default function AlbumViewList(props) {
  return (
    <Box>
      {
        props.album.songs.map((song, index) => (
          <SongListItem data={props.album.songs} index={index}/>
        ))
      }
    </Box>
  );
}