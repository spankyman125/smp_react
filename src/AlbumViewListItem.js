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

export default class SongViewListItem extends React.PureComponent {
  render() {
    const item = this.props.data[0];
    return (
      <ListItem 
        // style={this.props.style} 
        style={this.props.style} 
        key={this.props.index} 
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
          <IconButton>
              <PlayCircleIcon className="button" sx={{visibility:"hidden"}}/>
            </IconButton>
          <ListItemText primary={`${this.props.index + 1}. ${item.name}`} secondary="Artists info" />
          <ListItemText className="songInfo" secondary={`Time`} sx={{visibility:"hidden"}}/>
        </ListItemButton>
      </ListItem>
    );
  }  
}