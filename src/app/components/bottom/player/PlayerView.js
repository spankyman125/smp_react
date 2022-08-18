import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import React, { useContext } from "react";

import { URLMAIN_STATIC } from "../../../Consts";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { Player } from "../../../Player";

export default function PlayerView(props) {
  const { playerContext, setPlayerContext } = useContext(PlayerContext);
  const currentSong = playerContext.queue.songs[playerContext.queue.position] || null

  return (
    <>
      <SongCover song={currentSong} />
      <PreviousButton />
      <PlayToggle isPlaying={playerContext.isPlaying} />
      <NextButton />
      <SongInfo song={currentSong} />
    </>
  );
}

const SongCover = ({ song }) => {
  return (
    <Box sx={{ height: { xs: "45px", md: "50px" }}}>
      <img
        alt="Song cover"
        src={URLMAIN_STATIC + (song?.cover_url || "/static/images/song_covers/default.png")}
        height="100%"
        style={{ borderRadius: "10%" }}
      />
    </Box>
  )
}

const PlayToggle = ({ isPlaying }) => {
  return (
    <Checkbox
      checked={isPlaying}
      color='default'
      icon={<PlayArrowIcon />}
      checkedIcon={<PauseIcon />}
      onChange={Player.togglePlay}
    />
  )
}

const NextButton = () => {
  return (
    <IconButton onClick={Player.next}>
      <SkipNextIcon />
    </IconButton>
  )
}

const PreviousButton = () => {
  return (
    <IconButton onClick={Player.prev}>
      <SkipPreviousIcon />
    </IconButton>
  )
}

const SongInfo = ({ song }) => {
  return (
    <Box sx={{ minWidth: 0, flexGrow: 1, }}>
      <Typography noWrap variant="body1">
        {song?.title}
      </Typography>
      <Typography noWrap variant="subtitle2" >
        {song?.artists[0]?.name}
      </Typography>
    </Box>
  )
}