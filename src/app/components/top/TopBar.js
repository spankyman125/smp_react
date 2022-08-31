import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Grow, MenuList } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popper from '@mui/material/Popper';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { SearchAPI } from 'api/SearchAPI';
import { UserAPI } from "api/UserAPI";
import { URLMAIN_STATIC } from 'app/Consts';
import { useSnackbar } from 'notistack';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardsList } from '../main/left/CardsList';
import { AlbumSongsList } from '../main/left/song/lists/AlbumSongsList';
import { SearchAlbumCard } from "./SearchAlbumCard";
import { SearchArtistCard } from "./SearchArtistCard";
import ClickAwayListener from '@mui/base/ClickAwayListener';

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '245px',
      },
    },
  },
}));

const UserProfile = () => {

  const [image, setImage] = React.useState(null);
  const { enqueueSnackbar, closeSnack } = useSnackbar();
  const navigate = useNavigate();

  const fetchData = () => {
    UserAPI.me()
      .then(
        (result) => {
          setImage(URLMAIN_STATIC + result.image_url)
          enqueueSnackbar("User avatar received", { variant: 'info' });
        }
      )
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      })
  }

  React.useEffect(() => fetchData(), [])

  return (
    <Tooltip title="Open profile">
      <IconButton onClick={() => navigate("/users/me")}>
        <Avatar
          alt="Avatar"
          src={image}
        />
      </IconButton>
    </Tooltip>
  )
}

const NavigationButtons = () => {
  const navigate = useNavigate();

  const pages = [
    { label: "Home", handleClick: () => navigate("/home") },
    { label: "Collection", handleClick: () => navigate("/users/me") },
  ]

  return (
    pages.map((page) => (
      <Button
        key={page.label}
        onClick={page.handleClick}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        {page.label}
      </Button>
    ))
  )
}

const Search = () => {

  const controllerRef = useRef(null);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [open, setOpen] = useState(false)

  const handleOnFocus = () => {
    setOpen(true);
  }

  const handleClickAway = () => {
    console.log("close")
    setOpen(false);
  }

  const handleChange = (event) => {
    //Cancel previous api requests
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    SearchAPI.searchAlbums(controllerRef.current, { name: event.target.value })
      .then((result) => setAlbums(result));
    SearchAPI.searchArtists(controllerRef.current, { name: event.target.value })
      .then((result) => setArtists(result));
    SearchAPI.searchSongs(controllerRef.current, { name: event.target.value })
      .then((result) => setSongs(result));
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <SearchBox>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={handleChange}
          onFocus={handleOnFocus}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
        <SearchResults open={open} setOpen={setOpen} songs={songs} albums={albums} artists={artists} />
      </SearchBox>
    </ClickAwayListener>

  )
}

const SearchResults = ({ open, songs, albums, artists }) => {
  const anchorEl = React.useRef(null);


  return (
    <Box ref={anchorEl} sx={{ zIndex: "1", position: "relative" }}>
      <Popper
        open={open}
        anchorEl={anchorEl.current}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: 'right top' }}
          >
            <MenuList sx={{ maxWidth: "100vw", width: "600px", backgroundColor: "primary.main", borderRadius: '0 0 5% 5%' }}>
              {songs.length !== 0 && [
                <Box sx={{ paddingLeft: "10px" }}>
                  Songs:
                </Box>,
                <AlbumSongsList songs={songs} />
              ]}
              {albums.length !== 0 && [
                <Box sx={{ paddingLeft: "10px" }}>
                  Albums:
                </Box>,
                <CardsList>
                  {albums?.map((album) => <SearchAlbumCard album={album} />)}
                </CardsList>
              ]}
              {artists.length !== 0 && [
                <Box sx={{ paddingLeft: "10px" }}>
                  Artists:
                </Box>,
                <CardsList>
                  {artists?.map((artist) => <SearchArtistCard artist={artist} />)}
                </CardsList>
              ]}
            </MenuList>
          </Grow>
        )}
      </Popper>
    </Box >
  )
}

const NavigationMenu = () => {
  const navigate = useNavigate();

  const pages = [
    { label: "Home", handleClick: () => navigate("/home") },
    { label: "Collection", handleClick: () => navigate("/users/me") },
  ]
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <React.Fragment>
      <Tooltip title="Open menu">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {pages.map((page) => (
          <MenuItem key={page.label} onClick={page.handleClick}>
            <Typography textAlign="center">{page.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )
}

export const TopBar = () => {

  return (
    <AppBar position="static" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <NavigationMenu />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavigationButtons />
          </Box>
          <Box>
            <Search />
          </Box>
          <Box>
            <UserProfile />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
