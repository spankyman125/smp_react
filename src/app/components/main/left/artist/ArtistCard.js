import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { URLMAIN_STATIC } from 'app/Consts';
import { useNavigate } from "react-router-dom";

export function ArtistCard({ artist }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/artists/' + artist.id);
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
        src={URLMAIN_STATIC + artist.cover_url}
        alt={artist.name}
        width="100%"
        sx={{ borderRadius: "50%" }}>
      </Box>
      <Typography variant="subtitle2" noWrap sx={{ textAlign: "center" }}>
        {artist.name}
      </Typography>
    </Box>
  );
}
