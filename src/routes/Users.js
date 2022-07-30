import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AlbumView } from "AlbumView"

export const Users = () => {
  return (
    <Route path="users">
      <Route path="me"/>
      <Route path=":username"/>
    </Route>
  )
}