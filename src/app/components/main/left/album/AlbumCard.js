import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { URLMAIN_STATIC } from 'app/Consts';
import { useNavigate } from "react-router-dom";

export function AlbumCard({ album }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/albums/' + album.id + "/songs");
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        minWidth: { xs: "150px", lg: "200px" },
        width: { xs: "150px", lg: "200px" }
      }}
    >
      <Box
        component="img"
        src={URLMAIN_STATIC + album.cover_url}
        alt={album.title}
        width="100%"
        sx={{ borderRadius: "5%" }}>
      </Box>
      <Typography variant="subtitle2" noWrap>
        {album.title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" noWrap>
        {album.release_date}
      </Typography>
    </Box>
  );
}
