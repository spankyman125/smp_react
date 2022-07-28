import App from "./App";
import React from 'react';
import ReactDOM from 'react-dom/client';
import AlbumView from "./AlbumView"

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" />
        <Route path="albums" >
          <Route path=":id" element={<AlbumView/>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />}/>
      </Route>
    </Routes>
  </BrowserRouter>
);