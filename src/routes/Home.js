import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {HomeView} from "app/components/main/home/HomeView" 

export const Home = () => {
  return (
    <Route path="home" element={<HomeView/>}/>
  )
}