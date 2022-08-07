import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const DefaultRedirect = () => {
  return (
    <React.Fragment>
      <Route path="/" element={<Navigate to="/home" />}/>
      <Route path="*" element={<Navigate to="/home" />}/>
    </React.Fragment>
  )
}