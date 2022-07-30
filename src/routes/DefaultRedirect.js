import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AlbumView } from "AlbumView"

export const DefaultRedirect = () => {
  return (
    <Route path="*" element={<Navigate to="/" />}/>
  )
}