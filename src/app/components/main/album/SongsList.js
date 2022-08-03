import Box from '@mui/material/Box';
import SongListItem from "app/components/main/song/SongListItem";

export default function SongsList(props) {
  return (
    <Box>
      {
        props.album.songs.map((song, index) => (
          <SongListItem data={props.album.songs} index={index} key={index}/>
        ))
      }
    </Box>
  );
}