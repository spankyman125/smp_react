import { useNavigate } from "react-router-dom";
import { CardImage } from '../Card';

export const UserCardImage = ({ user, children }) => {
  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate('/users/' + user.username);
  }
  return (
    <CardImage
      image={user?.image_url}
      onClick={handleImageClick}
      sx={{height:"200px",width:"200px"}}
    >
      {children}
    </CardImage>
  )
}
