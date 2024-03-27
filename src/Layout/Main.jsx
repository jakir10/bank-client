import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/Navbar";
import FdrAccountForm from "../Pages/Home/Form";
const Main = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <FdrAccountForm></FdrAccountForm>
    </div>
  );
};

export default Main;
