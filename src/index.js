import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { App } from "App";
import { Albums } from 'routes/Albums';
import { Artists } from 'routes/Artists';
import { DefaultRedirect } from 'routes/DefaultRedirect';
import { Home } from 'routes/Home';
import { Users } from 'routes/Users';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {Home()}
        {Albums()}
        {Artists()}
        {Users()}
        {DefaultRedirect()}
      </Route>
    </Routes>
  </BrowserRouter>
);