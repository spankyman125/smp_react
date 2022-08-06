import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ArtistView } from "app/components/main/artist/ArtistView"
import { Outlet } from "react-router-dom";
import React from "react";

export const Artists = () => {
  return (
    <Route path="artists" >
      <Route path=":artistId" element={<ArtistView/>}>
        <Route path=":tab" element={null} />
      </Route>
      <Route path="" element={<Navigate to="/" />}/>
    </Route>
  )
}
