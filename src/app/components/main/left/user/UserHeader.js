import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UserAPI } from 'api/UserAPI';
import { useEffect, useState } from 'react';
import { CardButton } from '../Card';
import { Header } from "../Header";
import { UserCardImage } from './UserCard';

export const UserHeader = ({ user, editable }) => {
  return (
    <Header>
      <UserHeaderImage user={user} editable={editable} />
      <UserHeaderText user={user} editable={editable} />
    </Header>
  );
}

const UserHeaderImage = ({ user, editable }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleUploadImage = ({ target }) => {
    UserAPI.uploadImage(target.files[0])
      .then((result) => setEditedUser({ ...editedUser, image_url: result.image_url }))
  }
  useEffect(() => setEditedUser(user), [user]);

  return (
    <Box
      sx={{
        minWidth: "200px",
        width: "200px",
        height: "200px",
        position: "relative"
      }}
    >
      <UserCardImage user={editedUser}>
        {editable &&
          <CardButton>
            <Button
              component="label"
              variant="contained"
              sx={{ height: "35px", width: "35px", minWidth: "0px" }}
            >
              <FileUploadIcon />
              <input type="file" accept="image/*" onChange={handleUploadImage} hidden />
            </Button>
          </CardButton>
        }
      </UserCardImage>
    </Box>
  )

}

const UserHeaderText = ({ user, editable }) => {
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => setEditedUser(user), [user]);

  const handleCancel = () => {
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    UserAPI.update(
      data.get('name'),
      data.get('surname'),
      data.get('about')
    ).
      then((result) => {
        setEditedUser(result)
        setEditing(false);
      })
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h6">
        User
        {editable &&
          (editing ?
            <>
              <Button onClick={handleCancel}>
                <CloseIcon fontSize='small' />
              </Button>
              <Button type="submit">
                <CheckIcon fontSize='small' />
              </Button>
            </>
            :
            <Button onClick={handleEdit}>
              <EditIcon fontSize='small' />
            </Button>
          )
        }
      </Typography>
      <Typography variant="h4 ">
        {user?.username || <Skeleton variant="text" />}
      </Typography>
      {editedUser ?
        [
          <NameField name={editedUser.name} editing={editing} />,
          <SurnameField surname={editedUser.surname} editing={editing} />,
          <AboutField about={editedUser.about} editing={editing} />,
        ]
        :
        <>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </>
      }
    </Box>
  );
}

const NameField = ({ name, editing }) => {
  return (
    <EditableField
      label="Name"
      text={name}
      editing={editing}
      name="name"
    />
  )
}

const SurnameField = ({ surname, editing }) => {
  return (
    <EditableField
      label="Surname"
      text={surname}
      editing={editing}
      name="surname"
    />
  )
}

const AboutField = ({ about, editing }) => {
  return (
    <EditableField
      label="About"
      text={about}
      editing={editing}
      name="about"
    />
  )
}

const EditableField = ({ text, label, name, editing }) => {
  return (
    editing ?
      <div>
        <TextField
          variant="standard"
          label={label}
          defaultValue={text}
          size="small"
          name={name}
          sx={{ maxWidth: "150px" }}
        />
      </div>
      :
      <Typography>
        {text}
      </Typography>
  )
}