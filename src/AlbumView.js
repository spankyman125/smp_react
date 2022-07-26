import React from 'react';
import withRouter from './withRouter';
import SongViewList from "./SongViewList"
import AlbumViewList from "./AlbumViewList"
import AlbumInfo from "./AlbumInfo"
import '@fontsource/roboto/300.css';
import Typography from '@mui/material/Typography';
import SongViewListItem from "./SongViewListItem"
import Box from '@mui/material/Box';


class AlbumView extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      isLoaded: false,
      album: {
        id: null,
      }
    }
  }

  componentDidMount() { 
    fetch("http://septerra.duckdns.org:33333/albums/" + this.props.params.id)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          album: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    if (this.state.isLoaded) {
      return(
        <Box>
          <AlbumInfo album={this.state.album}/>
          <AlbumViewList album={this.state.album}/>
        </Box>
      )
    }
    else
      return(
        <div>Loading</div>
      )
  }
}

export default withRouter(AlbumView);