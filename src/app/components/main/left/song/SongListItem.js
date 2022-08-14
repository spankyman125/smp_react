import '@fontsource/roboto/300.css';
import { Link as MuiLink, useTheme } from '@mui/material/';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from "react-router-dom";
import { pulse } from "./effects/Pulse";

const ArtistsLinks = ({artists}) => {
  return artists.map((artist, i) =>(
    <span key={artist.id} onClick={(e)=>e.stopPropagation()}>   {/*preventing clicks on button underneath a link*/} 
      <MuiLink 
        variant="subtitle2"
        component={RouterLink} 
        to={"/artists/" + artist.id + "/songs"}
        underline="none"
        sx={{color:"info.main"}}
      >
        {artist.name}{i==artists.length-1 ? '' : ', '}
      </MuiLink>
    </span>
  ))
}

export const SongListItem = ({song, index, onSongClick, children, isSelected, isPlaying}) => {
  const theme = useTheme();
  return (
    <ListItem
      disablePadding 
      sx= {{
        animation: isPlaying && `${pulse(1,theme.palette.secondary.light)} 2s infinite`,
        ':hover': {'.showOnHover': { display:"inline-flex" }, '.hideOnHover': {display:"none"}}, 
        "boxShadow": (isSelected? `inset 0px 0px 0px 1px ${theme.palette.secondary.light}`:""),
        "> .MuiListItemButton-root": { //providing directly to ListItemButton has no effect
          paddingRight: children? 
            children.length * 40 + 10 + "px" //width of all icons + gap, prevents text overlapping buttons
            :
            "0px"
        },
      }}
      secondaryAction= {children ||null}
    >
      <ListItemButton sx={{ height: 64 }} onClick={onSongClick}>
        <ListItemText 
          primary={ `${index + 1}. ${song.title}`} 
          primaryTypographyProps={{noWrap: true}}
          secondary={<ArtistsLinks artists={ song.artists }/>}
          secondaryTypographyProps={{noWrap: true}}
        />
      </ListItemButton>
    </ListItem>
  );
}