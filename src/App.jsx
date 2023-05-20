import { Outlet } from "react-router-dom";
import "./App.scss";
import AppNavbar from "./components/Navbar";

function App() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}

export default App;
