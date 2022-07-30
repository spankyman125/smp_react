import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { App } from "App";
import { Albums } from 'routes/Albums'
import { Artists } from 'routes/Artists'
import { Home } from 'routes/Home'
import { Users } from 'routes/Users'
import { DefaultRedirect } from 'routes/DefaultRedirect'

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