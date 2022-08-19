import { ArtistView } from "app/components/main/left/artist/ArtistView";
import { Navigate, Outlet, Route } from "react-router-dom";

export const Artists = () => {
  return (
    <Route path="artists" >
      <Route path=":artistId" element={<Outlet />}>
        <Route path="songs" element={<ArtistView tab="songs" />} />
        <Route path="albums" element={<ArtistView tab="albums" />} />
        <Route path="*" element={<Navigate to="./songs" />} />
        <Route path="" element={<Navigate to="./songs" />} />
      </Route>
      <Route path="" element={<Navigate to="/home" />} />
    </Route>
  )
}
