import Box from '@mui/material/Box';
import SongListItem from "app/components/main/song/SongListItem";

export default function SongsList(props) {
  return (
    <Box>
      {
        props.songs.map((song, index) => (
          <SongListItem data={props.songs} index={index} key={index}/>
        ))
      }
    </Box>
  );
}