import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { CardButton, CardImage } from '../Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';


export const CreatePlaylistCard = ({ createPlaylist }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClick = () => {
    setOpenDialog(true);
  }

  return (
    <Box
      sx={{
        minWidth: { xs: "120px", sm: "150px", lg: "180px" },
        width: { xs: "120px", sm: "150px", lg: "180px" },
        position: "relative"
      }}
    >
      <Box sx={{ position: "relative" }} onClick={handleClick}>
        <Skeleton
          variant="rectangle"
          sx={{
            width: { xs: "120px", sm: "150px", lg: "180px" },
            height: { xs: "120px", sm: "150px", lg: "180px" },
          }} />
        <AddIcon sx={{ position: "absolute", bottom: "0%", right: "0%" }} fontSize="large" />
      </Box>
      <CreatePlaylistCardText />
      <CreateDialog open={openDialog} setOpen={setOpenDialog} createPlaylist={createPlaylist} />
    </Box>
  )
}

const CreateDialog = ({ open, setOpen, createPlaylist }) => {
  const valueRef = React.useRef(null)
  const handleCancel = () => {
    setOpen(false);
  };
  const handleCreate = () => {
    createPlaylist(valueRef.current.value)
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Create new playlist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter playlist's name
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Playlist's name"
          fullWidth
          variant="standard"
          inputRef={valueRef}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}

export const PlaylistCard = ({ playlist, deletePlaylist }) => {
  return (
    <>
      <PlaylistCardImage playlist={playlist} >
        <PlaylistDeleteButton onClick={deletePlaylist} />
      </PlaylistCardImage>
      <PlaylistCardText playlist={playlist} />
    </>
  )
}

export const PlaylistCardImage = ({ playlist, children }) => {
  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate('/playlists/' + playlist.id);
  }
  return (
    <CardImage
      image={playlist?.cover_url}
      onClick={handleImageClick}
      sx={{ 
        borderRadius: "5%",
        height:{ xs: "120px", sm: "150px", lg: "180px" },
        width: { xs: "120px", sm: "150px", lg: "180px" },
      }}
    >
      {children}
    </CardImage>
  )
}

export const PlaylistDeleteButton = ({ onClick }) => {
  return (
    <CardButton>
      <Button
        sx={{ width: "35px", height: "35px", minWidth: "0px" }}
        variant="contained"
        onClick={onClick}
      >
        <DeleteIcon />
      </Button>
    </CardButton>
  )
}

export const PlaylistUploadButton = ({ onImageUpload }) => {
  return (
    <CardButton>
      <Button
        component="label"
        variant="contained"
        sx={{ height: "35px", width: "35px", minWidth: "0px" }}
      >
        <FileUploadIcon />
        <input type="file" accept="image/*" onChange={onImageUpload} hidden />
      </Button>
    </CardButton>
  )
}

export const CreatePlaylistCardText = () => {
  return (
    <Typography variant="subtitle2" noWrap>
      Add new playlist
    </Typography>
  )
}

export const PlaylistCardText = ({ playlist }) => {
  return (
    <Typography variant="subtitle2" noWrap>
      {playlist.name}
    </Typography>
  )
}