import { Navigate, Outlet, Route } from "react-router-dom";
import { UserView } from "app/components/main/left/user/UserView";

export const Users = () => {
  return (
    <Route path="users" >
      <Route path=":username" element={<Outlet />}>
        <Route path="songs" element={<UserView tab="songs" />} />
        <Route path="albums" element={<UserView tab="albums" />} />
        <Route path="artists" element={<UserView tab="artists" />} />
        <Route path="*" element={<Navigate to="./songs" replace />} />
        <Route path="" element={<Navigate to="./songs" replace />} />
      </Route>
      <Route path="" element={<Navigate to="/home" />} />
    </Route>
  )
}