import { Outlet } from "react-router-dom";
import { Container } from '@mui/material';
import SmpAppBar  from "./SmpAppBar";
import SmpBottomAppBar  from "./SmpBottomAppBar";

export default function App() {
  return(
    <Container maxWidth="false">
      <SmpAppBar />
      <Container maxWidth="false">
        <Outlet />
      </Container>
      <SmpBottomAppBar/>
    </Container>
  )
}