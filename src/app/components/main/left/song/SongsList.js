import { List } from '@mui/material';
import Box from '@mui/material/Box';
import { Player } from 'app/Player';
import SongListItem from "app/components/main/left/song/SongListItem";
import { PlayerContext } from "app/contexts/PlayerContext";
import { useContext } from 'react';

export default function SongsList(props) {
  const {playerContext, setPlayerContext} = useContext(PlayerContext);
  const queueIsEmpty = (playerContext.queue.songs.length===0)? true : false
  let currentSong=null;
  if(!queueIsEmpty) {
    currentSong = playerContext.queue.songs[playerContext.queue.position];
  }
  
  if(props.songs && props.songs.length>0)  
  {
    window.next=()=>{Player.push(playerContext, setPlayerContext, props.songs[0])};
    return (
      <List>
      {
        props.songs.map((song, index) => (
          <SongListItem
            key={index + song.id } 
            song={song} 
            index={index} 
            playerContext={playerContext} 
            setPlayerContext={setPlayerContext}
            selected={ currentSong && currentSong.id===song.id? true : false}
          />
        ))
      }
      </List>
    );
  }

}