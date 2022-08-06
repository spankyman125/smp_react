import { BrowserRouter, Route, Routes } from "react-router-dom";

import { App } from "app/App";
import { Albums } from 'routes/Albums';
import { Artists } from 'routes/Artists';
import { DefaultRedirect } from 'routes/DefaultRedirect';
import { Home } from 'routes/Home';
import { Users } from 'routes/Users';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />}>
          {Home()}
          {Albums()}
          {Artists()}
          {Users()}
          {DefaultRedirect()}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
