import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '@fontsource/roboto/300.css';

export default function SongViewListItem(props) {
    const item = props.data[props.index];
    if(item)
      return (
        <ListItem 
          style={props.style} 
          key={props.index} 
          component="div" 
          disablePadding 
          sx= {{
            ':hover': {
              '.songInfo': { visibility:"visible"},
              '.button': { visibility:"visible"},
            }
          }}
          secondaryAction= {
            <div>
              <IconButton>
                <FavoriteBorderIcon className="button" sx={{visibility:"hidden"}}/>
              </IconButton>
              <IconButton>
                <AddIcon className="button" sx={{visibility:"hidden"}}/>
              </IconButton>

            </div>
          }
        >
          <ListItemButton sx={{ height: 64 }}>
            <ListItemText primary={`${props.index + 1}. ${item.name}`} secondary="Artists info" />
            <ListItemText className="songInfo" secondary={`Time`} sx={{visibility:"hidden"}}/>
          </ListItemButton>
        </ListItem>
      );
}