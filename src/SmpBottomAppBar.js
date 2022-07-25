import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';


const SmpBottomAppBar = () => {
  return (
    <AppBar position="static" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters variant="dense">
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default SmpBottomAppBar;
