import Menu from '@mui/material/Menu';
import React from 'react';

export const MoreMenu = ({anchor, handleMoreClose, children}) => {

  if(anchor)
    return (
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleMoreClose}
        disableScrollLock={ true }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {children}
      </Menu>
    );
}