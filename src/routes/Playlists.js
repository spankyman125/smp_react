import { Navigate, Outlet, Route } from "react-router-dom";
import { UserView } from "app/components/main/left/user/UserView";
import { PlaylistView } from "app/components/main/left/playlist/PlaylistView";

export const Playlists = () => {
  return (
    <Route path="playlists"  element={<Outlet />}>
      <Route path=":playlistId" element={<PlaylistView />} />
      <Route path="" element={<Navigate to="/home" />} />
    </Route>
  )
}