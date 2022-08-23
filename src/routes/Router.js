import { BrowserRouter, Route, Routes } from "react-router-dom";

import { App } from "app/App";
import { Login } from "app/components/Login";
import { AuthProvider } from "app/contexts/AuthContext";
import { Albums } from 'routes/Albums';
import { Artists } from 'routes/Artists';
import { DefaultRedirect } from 'routes/DefaultRedirect';
import { Home } from 'routes/Home';
import { RequireAuth } from 'routes/RequireAuth';
import { Users } from 'routes/Users';
import { Playlists } from 'routes/Playlists';

export function Router() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequireAuth><App /></RequireAuth>}>
            {Home()}
            {Playlists()}
            {Albums()}
            {Artists()}
            {Users()}
            {DefaultRedirect()}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
