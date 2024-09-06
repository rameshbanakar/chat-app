import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Register from "../pages/Register";
import CheckEmail from "../pages/CheckEmail";
import CheckPassword from "../pages/CheckPassword";
import MessagePage from "../component/MessagePage";
import AuthLayout from "../layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "register", element: <AuthLayout><Register /></AuthLayout> },
      { path: "email", element: <AuthLayout><CheckEmail /></AuthLayout> },
      { path: "password", element: <AuthLayout><CheckPassword/></AuthLayout> },
      {
        path: "",
        element: <Home />,
        children: [{ path: ":userId", element: <MessagePage /> }],
      },
    ],
  },
]);

export default router;
