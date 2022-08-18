import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuth } from 'app/contexts/AuthContext';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export const Login = () => {
  const [error, setError] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  let navigate = useNavigate();
  let auth = useAuth();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get('username');
    const password = data.get('password');
    const remember = data.get('remember');
    const password_repeat = data.get('password_repeat');

    const signWithCreds = () =>
      auth.signin( //Sign in with provided creds
        username, password, remember,
        () => navigate(from, { replace: true }), //Success callback after user signed in, redirect to previous page,
        () => setError(true) //Error callback if signin failed
      );

    if (isSignUp)
      if (password === password_repeat)  //TODO: Add creds checks
        auth.signup(
          username, password,
          () => signWithCreds(), //Success callback after user created
          () => setError(true), //Error callback if user not created
        );
      else
        setError(true);
    else
      signWithCreds();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign up" : "Sign in"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            error={error}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={error}
            helperText=""
          />
          {isSignUp &&
            <TextField
              margin="normal"
              required
              fullWidth
              name="password_repeat"
              label="Repeat password"
              type="password"
              id="password_repeat"
              autoComplete="current-password"
              error={error}
              helperText=""
            />
          }
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormControlLabel
              control={<Checkbox value={true} name="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              variant="text"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => { setIsSignUp(!isSignUp) }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignUp ? "Sign up" : "Sign in"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}