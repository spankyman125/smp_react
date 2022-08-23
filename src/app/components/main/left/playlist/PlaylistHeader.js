import { Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";
import { PlaylistAPI } from '../../../../../api/PlaylistAPI';
import { Header } from "../Header";
import { PlaylistCardImage, PlaylistUploadButton } from './PlaylistCard';


export const PlaylistHeader = ({ playlist }) => {
  return (
    <Header>
      <PlaylistHeaderImage playlist={playlist} />
      <PlaylistHeaderText playlist={playlist} />
    </Header>
  );
}

const PlaylistHeaderText = ({ playlist }) => {
  return (
    <>
      <Typography variant="h6">
        Playlist
      </Typography>
      <Typography variant="h4">
        {playlist ?
          playlist.name
          :
          <Skeleton variant="text" width={200} />
        }
      </Typography>
    </>
  );
}

const PlaylistHeaderImage = ({ playlist }) => {
  const handleUploadImage = ({ target }) => {
    PlaylistAPI.uploadImage(playlist.id,target.files[0])
  }

  return (
    <Box
      sx={{
        minWidth: { xs: "120px", sm: "150px", lg: "180px" },
        width: { xs: "120px", sm: "150px", lg: "180px" },
        position: "relative"
      }}
    >
      <PlaylistCardImage playlist={playlist} >
        <PlaylistUploadButton onImageUpload={handleUploadImage} />
      </PlaylistCardImage>
    </Box>
  )
}
