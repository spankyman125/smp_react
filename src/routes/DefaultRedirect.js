import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const DefaultRedirect = () => {
  return (
    <React.Fragment>
      <Route path="/" element={<Navigate to="/home" replace />}/>
      <Route path="*" element={<Navigate to="/home" replace />}/>
    </React.Fragment>
  )
}