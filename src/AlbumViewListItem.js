import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default class AlbumViewListItem extends React.PureComponent {
  render() {
    const item = this.props.data[0];
    return (
      <ListItem 
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
        <ListItemButton >
          <IconButton>
              <PlayCircleIcon className="button" sx={{visibility:"hidden"}}/>
            </IconButton>
          <ListItemText primary={`${item.name} ${this.props.index + 1}`} />
          <ListItemText className="songInfo" primary={`Song Info`} sx={{visibility:"hidden"}}/>
        </ListItemButton>
      </ListItem>
    );
  }  
}