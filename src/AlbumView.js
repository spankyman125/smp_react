import React from 'react';
import withRouter from './withRouter';
import AlbumViewList from "./AlbumViewList"

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
        <div>
          <h1>AlbumView</h1>
          <h3>Title: {this.state.album.title}</h3>
          <AlbumViewList/>
        </div>
      )
    }
    else
      return(
        <div>Loading</div>
      )
  }
}

export default withRouter(AlbumView);