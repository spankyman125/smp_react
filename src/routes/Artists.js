import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const Artists = () => {
  return (
    <Route path="artists">
      <Route path=":artistId">
        <Route path="albums">
          <Route path=":albumId"/>
        </Route>
        <Route path="songs">
          <Route path=":songId"/>
        </Route>
      </Route>
    </Route>
  )
}