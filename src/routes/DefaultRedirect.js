import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const DefaultRedirect = () => {
  return (
    <Route path="*" element={<Navigate to="/" />}/>
  )
}