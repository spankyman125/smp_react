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
import { URLMAIN_STATIC } from "app/Consts";
import { useEffect, useState } from 'react';
import { Header } from "../Header";


export const UserHeader = ({ user, editable }) => {
  return (
    <Header>
      <UserHeaderImage image={user?.image_url} editable={editable} />
      <UserHeaderText user={user} editable={editable} />
    </Header>
  );
}

const UserHeaderImage = ({ image, editable }) => {
  const [editedImage, setEditedImage] = useState(image);

  const handleUploadImage = ({ target }) => {
    UserAPI.uploadImage(target.files[0])
      .then((result) => setEditedImage(result.image_url))
  }
  useEffect(() => setEditedImage(image), [image]);

  return (
    <Box sx={{
      position: "relative",
      borderRadius: '50%',
      width: "200px",
      height: "200px"
    }}>
      {editedImage ?
        <img
          src={URLMAIN_STATIC + editedImage}
          width="100%"
          height="100%"
          style={{ borderRadius: "7%" }}
        />
        :
        <Skeleton variant="rectangle" width={200} height={200} />
      }
      {editable &&
        <>
          <Button
            component="label"
            variant="contained"
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              height: "35px",
              width: "35px",
              minWidth: "5px"
            }}>
            <FileUploadIcon />
            <input type="file" accept="image/*" onChange={handleUploadImage} hidden />
          </Button>
        </>
      }
    </Box>
  );
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