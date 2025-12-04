import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register.jsx/Register";
import PrivateRoutes from "../Routes/PrivateRoutes";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            path:'/',
            Component: Home
        },
        {
          path:'/rider',
          element: <PrivateRoutes><Rider></Rider></PrivateRoutes>
        },
        {
          path: '/sendParcel',
          element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>
        },
        {
          path:'/coverage',
          element: <Coverage></Coverage>,
          loader: () => fetch('/warehouses.json').then(res=>res.json())
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  }
]);