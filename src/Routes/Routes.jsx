import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import BankDashboard from "../Pages/Dashboard/BankDashboard ";
import BangladeshBankDashbard from "../Pages/Dashboard/BangladeshBankDashbard";
// import Login from "../Pages/Login/Login";
// import About from "../Pages/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/home",
        element: <Home></Home>,
      },
      // {
      //   path: "/about",
      //   element: <About></About>,
      // },
      // {
      //   path: "/login",
      //   element: <Login></Login>,
      // },
      {
        path: "/bankdashboard",
        element: <BankDashboard></BankDashboard>,
      },
      {
        path: "/bangladeshbankdashboard",
        element: <BangladeshBankDashbard></BangladeshBankDashbard>,
      },
    ],
  },
]);
