import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AlbumView } from "AlbumView"

export const Albums = () => {
  return (
    <Route path="albums" >
      <Route path=":albumId" element={<AlbumView/>} >
        <Route path="songs">
          <Route path=":songId" />
        </Route>
      </Route>
    </Route>
  )
}