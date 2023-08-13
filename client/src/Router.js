import {createBrowserRouter} from "react-router-dom";
import Home from './Pages/home'
import Login from './Pages/Auth/login'
import BorrowedBooks from './Pages/borrowedBooks'
import App from "./App";
import SignUp from "./Pages/Auth/signUp"
import ManageUsersAccounts from "./Pages/Manage/manageUsersAccounts"
import ManageBooks from "./Pages/Manage/manageBooks"
import ManageBorrowingRequests from "./Pages/Manage/manageBorrowingRequests"
import NotFound from "./Pages/notFound";
import BookInfo from "./Pages/bookInfo";
import Testing from "./Pages/testing"
const router = createBrowserRouter([
    {
      path:"/",
      element:<App/>,
      children:[
        {
          path: "/",
          element: <Home/>,
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/borrowedBooks/:id",
            element: <BorrowedBooks/>,
        }
        ,
        {
          path: "/signUp",
          element: <SignUp/>,
        },
        {
          path: "/manageUsersAccounts",
          element: <ManageUsersAccounts/>,
        },
        {
          path: "/manageBorrowingRequests",
          element: <ManageBorrowingRequests/>,
        },
        {
          path: "/manageBooks",
          element: <ManageBooks/>,
        },
        {
          path: "/:id",
          element:<BookInfo/>
        },
        {
          path: "/testing",
          element: <Testing/>,
        },
        {
          path: "/*",
          element: <NotFound/>,
        }
      ]
    }
  ]);
export default router;
