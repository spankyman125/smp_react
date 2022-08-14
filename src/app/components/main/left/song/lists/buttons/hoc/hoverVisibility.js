import React from 'react';


export const hideOnHover = (WrappedButton) => {
  return (props) => {
    return <WrappedButton 
      {...props} 
      sx={{
        width:"40px",
        display: "inline-flex",
        "@media(pointer: coarse)": { display:"none" }
      }} 
      className="hideOnHover"
    />
  }
}

export const showOnHover = (WrappedButton) => {
  return (props) => {
    return <WrappedButton {...props}         
      sx={{ 
        width:"40px",
        display: "none",
        "@media(pointer: coarse)": { display:"inline-flex" }  
      }}
      className="showOnHover"
    />
  }
}
